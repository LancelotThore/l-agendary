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
            ->leftJoin('e.eventsUser', 'u')
            ->groupBy('e.id')
            ->where('e.privacy = 1')
            ->orderBy('COUNT(u.user)', 'DESC')
            ->setMaxResults(6)
            ->getQuery()
            ->getResult();

        return $this->json($highlighted_events);
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

    return $this->json($paginated_events);
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

    return $this->json($events);
}

    /**
     * @Route("/register-event", name="register-event", methods={"POST"})
     */
    public function RegisterEvent(Request $request, EntityManagerInterface $entityManager, MailerInterface $mailer): Response
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
                        <a href="https://yourwebsite.com/confirm-registration/' . $userEvent::getToken() . '">
                            <button>Confirmer l\'inscription</button>
                        </a>');

                $mailer->send($email);
            } else {
                return $this->json(['error' => 'Vous possédez déjà un compte sur notre application, veuillez vous connecter pour vous inscrire à cet événement.'], 400);
            }
        }

        return $this->json(['status' => 'success']);

        // if (!$eventId) {
        //     return $this->json(['error' => 'Event ID non valide'], 400);
        // }

        // // Récupérer l'événement depuis la base de données
        // $event = $entityManager->getRepository(Event::class)->find($eventId);

        // if (!$event) {
        //     return $this->json(['error' => 'Événement non trouvé'], 404);
        // }

        // // Créer l'inscription
        // $eventRegistration = new EventRegistration();
        // $eventRegistration->setValidation(false);
        // $eventRegistration->setToken(bin2hex(random_bytes(32)));
        // $eventRegistration->setEvent($event);
        // $eventRegistration->setEmail($email);

        // // Persister l'inscription
        // $entityManager->persist($eventRegistration);
        // $entityManager->flush();

        // return $this->json(['status' => 'success']);
    }
}