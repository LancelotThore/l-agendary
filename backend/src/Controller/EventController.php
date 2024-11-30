<?php

namespace App\Controller;

use App\Entity\Event;
use App\Entity\User;
use App\Entity\UserEvent;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class EventController extends AbstractController
{
    /**
     * @Route("/api/highlighted-events", name="highlighted-events")
     */
    public function highlightedEvents(EntityManagerInterface $entityManager): Response
    {
        $highlighted_events = $entityManager->getRepository(Event::class)
            ->createQueryBuilder('e')
            ->leftJoin('e.userEvents', 'ue')
            ->groupBy('e.id')
            ->where('e.privacy = 1')
            ->orderBy('COUNT(ue.user)', 'DESC')
            ->setMaxResults(6)
            ->getQuery()
            ->getResult();

        $serializer = $this->container->get('serializer');
        $highlighted_events_json = $serializer->serialize($highlighted_events, 'json', ['circular_reference_handler' => function ($object) {
            return $object->getId();
        }]);

        return new Response($highlighted_events_json, 200, ['Content-Type' => 'application/json']);
    }

    /**
     * @Route("/api/event/{id}", name="event", methods={"GET"})
     */
    public function event($id, EntityManagerInterface $entityManager): Response
    {
        $event = $entityManager->getRepository(Event::class)->find($id);

        $serializer = $this->container->get('serializer');
        $event_json = $serializer->serialize($event, 'json', ['circular_reference_handler' => function ($object) {
            return $object->getId();
        }]);

        return new Response($event_json, 200, ['Content-Type' => 'application/json']);
    }

/**
 * @Route("/api/paginated-events", name="paginated-events", methods={"GET"})
 */
public function paginatedEvents(Request $request, EntityManagerInterface $entityManager): Response
{
    $limit = $request->query->getInt('limit', 9); // Default limit to 10 if not provided
    $offset = $request->query->getInt('offset', 0); // Default offset to 0 if not provided

    $paginated_events = $entityManager->getRepository(Event::class)
        ->createQueryBuilder('e')
        ->setFirstResult($offset)
        ->setMaxResults($limit)
        ->where('e.privacy = 1')
        ->getQuery()
        ->getResult();

        $serializer = $this->container->get('serializer');
        $paginated_events_json = $serializer->serialize($paginated_events, 'json', ['circular_reference_handler' => function ($object) {
            return $object->getId();
        }]);

        return new Response($paginated_events_json, 200, ['Content-Type' => 'application/json']);
}

/**
 * @Route("/api/nb-public-events", name="nb-public-events", methods={"GET"})
 */
public function nbPublicEvents(EntityManagerInterface $entityManager): Response
{
    $nb_events = $entityManager->getRepository(Event::class)
        ->createQueryBuilder('e')
        ->select('COUNT(e.id)')
        ->where('e.privacy = 1')
        ->getQuery()
        ->getSingleScalarResult();

    return $this->json($nb_events);
}

/**
 * @Route("/api/search-events", name="search-events", methods={"GET"})
 */
public function searchEvents(Request $request, EntityManagerInterface $entityManager): Response
{
    $searchTerm = $request->query->get('q', '');

    $queryBuilder = $entityManager->getRepository(Event::class)
        ->createQueryBuilder('e')
        ->where('(e.title LIKE :searchTerm OR e.description LIKE :searchTerm) AND e.privacy = 1')
        ->setParameter('searchTerm', '%' . $searchTerm . '%');

    $events = $queryBuilder->getQuery()->getResult();

    $serializer = $this->container->get('serializer');
    $events_json = $serializer->serialize($events, 'json', ['circular_reference_handler' => function ($object) {
        return $object->getId();
    }]);

    return new Response($events_json, 200, ['Content-Type' => 'application/json']);
}

    /**
     * @Route("/register-event", name="register-event", methods={"POST"})
     */
    public function registerEvent(Request $request, EntityManagerInterface $entityManager, MailerInterface $mailer): Response
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'];
        $eventId = $data['event'];
        $existingUser = $entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
        $event = $entityManager->getRepository(Event::class)->find($eventId);
        
        // Créer l'inscription
        $eventUser = new UserEvent();
        $eventUser->setToken(bin2hex(random_bytes(32)));
        $eventUser->setEvent($event);

        if (!$existingUser) {
            // Création d'un utilisateur fictif
            $user = new User();
            $user->setEmail($email);
            $user->setPassword('default_password');
            $user->setFirstName('Default');
            $user->setLastName('User');
            $user->setRoles(['ROLE_EMAIL']);
            $entityManager->persist($user);
            
            $eventUser->setUser($user);
            $eventUser->setValidation(false);    
            $entityManager->persist($eventUser);  
            $entityManager->flush();
            
            $email = (new Email())
                ->from('your_email@example.com')
                ->to($user->getEmail())
                ->subject('Confirmation d\'inscription à un événement')
                ->html('<p>Vous vous êtes inscrit à l\'événement ' . $event->getTitle() . ' sur notre site. Pour confirmer votre inscription, veuillez cliquer sur le bouton ci-dessous.</p>
                        <a href="https://localhost:3000/confirm-registration?token=' . $eventUser->getToken() . '">
                            <button>Confirmer l\'inscription</button>
                        </a>');

                $mailer->send($email);
        } else {
            if($entityManager->getRepository(UserEvent::class)->findOneBy(['event' => $event, 'user' => $existingUser])) {
                return $this->json(['error' => 'Vous êtes déjà inscrit à cet événement'], 400);
            }
            if($existingUser->getRoles() == ['ROLE_EMAIL']) {
                $userEvent::setUser($existingUser);
                $userEvent::setValidation(false);
                $entityManager->persist($eventUser);  
                $entityManager->flush();
                
                $email = (new Email())
                ->from('your_email@example.com')
                ->to($user->getEmail())
                ->subject('Confirmation d\'inscription à un événement')
                ->html('<p>Vous vous êtes inscrit à l\'événement ' . $event->getTitle() . ' sur notre site. Pour confirmer votre inscription, veuillez cliquer sur le bouton ci-dessous.</p>
                        <a href="https://localhost:3000/confirm-registration?token=' . $userEvent::getToken() . '">
                            <button>Confirmer l\'inscription</button>
                        </a>');

                $mailer->send($email);
            } else {
                return $this->json(['error' => 'Vous possédez déjà un compte sur notre application, veuillez vous connecter pour vous inscrire à cet événement.'], 400);
            }
        }

        return $this->json(['status' => 'success']);
    }

    /**
     * @Route("/confirm-registration", name="confirm-registration", methods={"POST"})
     */
    public function confirmRegistration(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        $token = $data['token'];    
        $userEvent = $entityManager->getRepository(UserEvent::class)->findOneBy(['token' => $token]);

        if (!$userEvent) {
            return $this->json(['error' => 'Invalid token'], 400);
        }

        $userEvent->setValidation(true);
        $entityManager->flush();

        return $this->json(['status' => 'success']);
    }
}