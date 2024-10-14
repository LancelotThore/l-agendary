<?php

namespace App\Controller;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Psr\Log\LoggerInterface;


use App\Entity\User;
use App\Repository\UserRepository;

class SecurityController extends AbstractController
{
    private $passwordHasher;
    private $userRepo;
    private $tokenStorage;
    private $logger;
    private $entityManager;

    public function __construct(UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager, UserRepository $userRepo, TokenStorageInterface $tokenStorage, LoggerInterface $logger)
    {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
        $this->userRepo = $userRepo;
        $this->tokenStorage = $tokenStorage;
        $this->logger = $logger;
    }

    public function login(Request $request): Response
    {
        if ($request->isMethod('POST')) {
            $data = json_decode($request->getContent(), true);

            if (!isset($data['email']) || !isset($data['password'])) {
                return new JsonResponse('Email and password are required.', Response::HTTP_BAD_REQUEST);
            }

            $email = $data['email'];
            $password = $data['password'];

            $user = $this->userRepo->findOneBy(['email' => $email]);

            if (!$user || !$this->passwordHasher->isPasswordValid($user, $password)) {
                $this->logger->warning('Invalid login attempt for email: ' . $email);
                return new JsonResponse('Invalid credentials.', Response::HTTP_UNAUTHORIZED);
            }

            $token = new UsernamePasswordToken($user, "", "main", $user->getRoles());
            $this->tokenStorage->setToken($token);
            $request->getSession()->set('_security_main', serialize($token));

            $this->logger->info('User logged in: ' . $email);
            return new JsonResponse('Login successful.', Response::HTTP_OK);
        }

        return new JsonResponse('Invalid request method', Response::HTTP_METHOD_NOT_ALLOWED);
    }

    public function register(Request $request): JsonResponse
    {
        // Vérifie si la requête est de type POST
        if ($request->isMethod('POST')) {
            // Décode le JSON reçu
            $data = json_decode($request->getContent(), true);

            // Vérifie si les données sont valides
            if (!isset($data['_email'], $data['_password'])) {
                return new JsonResponse('Invalid doto.', JsonResponse::HTTP_BAD_REQUEST);
            }

            // Crée un nouvel utilisateur
            $user = new User();
            $user->setEmail($data['email']);
            
            // Hash le mot de passe
            $hashedPassword = $this->passwordHasher->hashPassword($user, $data['password']);
            $user->setPassword($hashedPassword);

            // Sauvegarde l'utilisateur dans la base de données
            $this->entityManager->persist($user);
            $this->entityManager->flush();

            // Authentifie l'utilisateur
            $token = new UsernamePasswordToken($user, "", 'main', $user->getRoles());
            $this->tokenStorage->setToken($token);
            $request->getSession()->set('_security_main', serialize($token));

            $this->logger->info('User logged in: ' . $user->getEmail());
            return new JsonResponse('User registered successfully.', JsonResponse::HTTP_CREATED);
        }
        return new JsonResponse('Invalid request method', Response::HTTP_METHOD_NOT_ALLOWED);

    }

    public function logout(Request $request): Response
    {
        $request->getSession()->clear();
        $this->logger->info('User logged out.');
        return new JsonResponse('Logged out successfully.', Response::HTTP_OK);
    }
}