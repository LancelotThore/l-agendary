<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Bundle\SecurityBundle\Security;

class SecurityController extends AbstractController
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    // public function login(
    //     Request $request, 
    //     JWTTokenManagerInterface $JWTManager, 
    //     AuthenticationUtils $authenticationUtils
    // ): JsonResponse {
    //     // Récupérer les erreurs d'authentification s'il y en a
    //     $error = $authenticationUtils->getLastAuthenticationError();
        
    //     if ($error instanceof AuthenticationException) {
    //         return new JsonResponse(['message' => 'Invalid credentials'], 401);
    //     }

    //     // Récupérer l'utilisateur authentifié
    //     $user = $this->getUser();

    //     if (!$user) {
    //         return new JsonResponse(['message' => 'Invalid credentials'], 401);
    //     }

    //     // Générer le token JWT
    //     $token = $JWTManager->create($user);

    //     // Retourner le JWT dans la réponse JSON
    //     return new JsonResponse(['token' => $token], 200);
    // }

    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
