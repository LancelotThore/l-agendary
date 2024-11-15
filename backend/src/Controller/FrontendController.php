<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class FrontendController extends AbstractController
{

    public function redirectToHome(): Response
    {
        return $this->redirect('http://localhost:3000/');
    }

    public function sessionInfo(Request $request): Response
    {
        // Récupération de la session depuis la requête
        $session = $request->getSession();


        return $this->json($request);

        return $this->json(unserialize($session->get('_security_main')));

        // Vérifiez si la session contient les données de l'utilisateur
        if (!$session->has('_security_main')) {
            return $this->json(['error' => 'No user found in session'], 401);
        }

        // Récupération des données de l'utilisateur depuis la session
        $userData = unserialize($session->get('_security_main'));

        // Vérifiez si les données de l'utilisateur sont présentes
        if (!$userData) {
            return $this->json(['error' => 'No user data found in session'], 401);
        }

        // Retourner les informations de l'utilisateur avec un code HTTP 200
        return $this->json($userData, 200);
    }
}
