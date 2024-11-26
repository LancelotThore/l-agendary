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
 * @Route("/api/unique-locations", name="unique-locations", methods={"GET"})
 */
public function getUniqueLocations(EntityManagerInterface $entityManager): Response
{
    $queryBuilder = $entityManager->getRepository(Event::class)
        ->createQueryBuilder('e')
        ->select('DISTINCT e.location')
        ->where('e.privacy = 1');

    $locations = $queryBuilder->getQuery()->getResult();

    return $this->json($locations);
}

    /**
     * @Route("/api/search-events", name="search-events", methods={"GET"})
     */
    public function searchEvents(Request $request, EntityManagerInterface $entityManager): Response
    {
        $searchTerm = $request->query->get('q', null);
        $location = $request->query->get('location', null);
        $startDate = $request->query->get('startDate', null);
        $endDate = $request->query->get('endDate', null);
        $creatorFirstname = $request->query->get('creatorFirstname', null);
        $limit = $request->query->get('limit', 9);
        $offset = $request->query->get('offset', 0);

        $queryBuilder = $entityManager->getRepository(Event::class)
            ->createQueryBuilder('e')
            ->leftJoin('e.creator', 'c')
            ->where('e.privacy = 1');

        // Check if all search parameters are empty
        $isSearchEmpty = $searchTerm === null && $location === null && $startDate === null && $endDate === null && $creatorFirstname === null;

        if (!$isSearchEmpty) {
            if ($searchTerm !== null) {
                $queryBuilder->andWhere('(e.title LIKE :searchTerm OR e.description LIKE :searchTerm)')
                    ->setParameter('searchTerm', '%' . $searchTerm . '%');
            }

            if ($location !== null) {
                $queryBuilder->andWhere('e.location = :location')
                    ->setParameter('location', $location);
            }

            if ($startDate !== null) {
                $queryBuilder->andWhere('e.start_date LIKE :startDate')
                    ->setParameter('startDate', $startDate . '%');
            }

            if ($endDate !== null) {
                $queryBuilder->andWhere('e.end_date LIKE :endDate')
                    ->setParameter('endDate', $endDate . '%');
            }

            if ($creatorFirstname !== null) {
                $queryBuilder->andWhere('c.firstname LIKE :creatorFirstname')
                    ->setParameter('creatorFirstname', '%' . $creatorFirstname . '%');
            }
        }

        // Clone the query builder for the count query
        $countQueryBuilder = clone $queryBuilder;
        $totalEvents = $countQueryBuilder->select('COUNT(e.id)')
                                         ->getQuery()
                                         ->getSingleScalarResult();

        // Set limit and offset for pagination
        $queryBuilder->setMaxResults($limit)
                     ->setFirstResult($offset);

        $events = $queryBuilder->getQuery()->getResult();

        return $this->json([
            'total' => $totalEvents,
            'events' => $events
        ]);
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

    /**
     * @Route("/api/events", name="create-event", methods={"POST"})
     */
    public function createEvent(Request $request, EntityManagerInterface $entityManager): JsonResponse
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

        $eventData = json_decode($request->getContent(), true);

        $event = new Event();
        $event->setTitle($eventData['title']);
        $event->setDescription($eventData['description']);
        $event->setPrivacy($eventData['privacy']);
        $event->setLocation($eventData['location']);
        $event->setStartDate(new \DateTime($eventData['start_date']));
        $event->setEndDate(new \DateTime($eventData['end_date']));
        $event->setImage($eventData['image']);
        $event->setCreator($user);

        try {
            $entityManager->persist($event);
            $entityManager->flush();
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(['success' => 'Event created successfully']);
    }
}