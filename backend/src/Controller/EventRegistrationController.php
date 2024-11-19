<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\EventRegistration;
use App\Form\EventRegistrationType;
use Doctrine\ORM\EntityManagerInterface;

class EventRegistrationController extends AbstractController
{
    /**
     * @Route("/event-registrations-with-mail", name="event-registration-with-mail", methods={"POST"})
     */
    public function registerWithEmail(Request $request, EntityManagerInterface $entityManager): Response
    {
        $email = $request->get('email');
        $eventId = $request->get('event');

        if (!$eventId) {
            return $this->json(['error' => 'Event ID non valide'], 400);
        }

        // Récupérer l'événement depuis la base de données
        $event = $entityManager->getRepository(Event::class)->find($eventId);

        if (!$event) {
            return $this->json(['error' => 'Événement non trouvé'], 404);
        }

        // Créer l'inscription
        $eventRegistration = new EventRegistration();
        $eventRegistration->setValidation(false);
        $eventRegistration->setToken(bin2hex(random_bytes(32)));
        $eventRegistration->setEvent($event);
        $eventRegistration->setEmail($email);

        // Persister l'inscription
        $entityManager->persist($eventRegistration);
        $entityManager->flush();

        return $this->json(['status' => 'success']);
    }

}