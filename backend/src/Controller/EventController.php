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
            ->where('e.privacy = true')
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
}