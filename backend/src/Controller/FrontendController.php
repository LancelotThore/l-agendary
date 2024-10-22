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
        $user = $request->getSession()->get('user');

        if (!$user) {
            return $this->json(['error' => 'No user found in session'], 401);
        }

        return $this->json($user);
    }
}
