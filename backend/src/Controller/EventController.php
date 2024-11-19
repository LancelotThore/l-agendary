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
    $searchTerm = $request->query->get('q', '');
    $location = $request->query->get('location', '');
    $startDate = $request->query->get('startDate', '');
    $endDate = $request->query->get('endDate', '');
    $creatorFirstname = $request->query->get('creatorFirstname', '');
    $limit = $request->query->get('limit', 9);
    $offset = $request->query->get('offset', 0);

    $queryBuilder = $entityManager->getRepository(Event::class)
        ->createQueryBuilder('e')
        ->leftJoin('e.creator', 'c')
        ->where('(e.title LIKE :searchTerm OR e.description LIKE :searchTerm) AND e.privacy = 1')
        ->setParameter('searchTerm', '%' . $searchTerm . '%');

    if (!empty($location)) {
        $queryBuilder->andWhere('e.location = :location')
            ->setParameter('location', $location);
    }

    if (!empty($startDate)) {
        $queryBuilder->andWhere('e.start_date LIKE :startDate')
            ->setParameter('startDate', $startDate . '%');
    }
    
    if (!empty($endDate)) {
        $queryBuilder->andWhere('e.end_date LIKE :endDate')
            ->setParameter('endDate', $endDate . '%');
    }

    if (!empty($creatorFirstname)) {
        $queryBuilder->andWhere('c.firstname LIKE :creatorFirstname')
            ->setParameter('creatorFirstname', '%' . $creatorFirstname . '%');
    }

    $queryBuilder->setMaxResults($limit)
                 ->setFirstResult($offset);

    $events = $queryBuilder->getQuery()->getResult();

    return $this->json($events);
}
}