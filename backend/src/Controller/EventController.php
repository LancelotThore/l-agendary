<?php

namespace App\Controller;

use App\Entity\Event;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use App\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Security;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;

class EventController extends AbstractController
{
    private $jwtManager;
    private $jwtEncoder;

    public function __construct(JWTTokenManagerInterface $jwtManager, JWTEncoderInterface $jwtEncoder)
    {
        $this->jwtManager = $jwtManager;
        $this->jwtEncoder = $jwtEncoder;
    }

    /**
     * @Route("/api/highlighted-events", name="highlighted-events")
     */
    public function highlightedEvents(EntityManagerInterface $entityManager): Response
    {
        $highlighted_events = $entityManager->getRepository(Event::class)
            ->createQueryBuilder('e')
            ->leftJoin('e.registered_users', 'u')
            ->groupBy('e.id')
            ->where('e.privacy = 1')
            ->orderBy('COUNT(u.id)', 'DESC')
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
     * @Route("/api/events/join/{id}", name="join-event", methods={"POST"})
     */
    public function joinEvent(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer le token depuis le cookie
        $token = $request->cookies->get('token');

        if (!$token) {
            return $this->json(['error' => 'Token not found'], Response::HTTP_UNAUTHORIZED);
        }

        // Décoder le token pour obtenir les informations de l'utilisateur
        $data = $this->jwtEncoder->decode($token);
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['username']]);

        if (!$user) {
            return $this->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        // Trouver l'événement par ID
        $event = $entityManager->getRepository(Event::class)->find($id);

        if (!$event) {
            return $this->json(['error' => 'Event not found'], Response::HTTP_NOT_FOUND);
        }

        try {
            // Ajouter l'utilisateur à l'événement
            $event->addRegisteredUser($user);
            $entityManager->persist($event);
            $entityManager->flush();
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(['success' => 'User registered to event successfully']);
    }

    /**
     * @Route("/api/events/leave/{id}", name="leave-event", methods={"DELETE"})
     */
    public function leaveEvent(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer le token depuis le cookie
        $token = $request->cookies->get('token');

        if (!$token) {
            return $this->json(['error' => 'Token not found'], Response::HTTP_UNAUTHORIZED);
        }

        // Décoder le token pour obtenir les informations de l'utilisateur
        $data = $this->jwtEncoder->decode($token);
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['username']]);

        if (!$user) {
            return $this->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        // Trouver l'événement par ID
        $event = $entityManager->getRepository(Event::class)->find($id);

        if (!$event) {
            return $this->json(['error' => 'Event not found'], Response::HTTP_NOT_FOUND);
        }

        try {
            // Retirer l'utilisateur de l'événement
            $event->removeRegisteredUser($user);
            $entityManager->persist($event);
            $entityManager->flush();
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(['success' => 'User unregistered from event successfully']);
    }
}