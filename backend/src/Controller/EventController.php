<?php

namespace App\Controller;

use App\Entity\Event;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class EventController extends AbstractController
{
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
}