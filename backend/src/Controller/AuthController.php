<?php

// src/Controller/AuthController.php

namespace App\Controller;

use App\Entity\User;
use App\Entity\UserEvent;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\SerializerInterface;

use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;

class AuthController extends AbstractController
{
    private $entityManager;
    private $jwtManager;
    private $passwordEncoder;
    private $validator;

    public function __construct(
        EntityManagerInterface $entityManager,
        JWTTokenManagerInterface $jwtManager,
        UserPasswordHasherInterface $passwordHasher,
        ValidatorInterface $validator,
        JWTEncoderInterface $jwtEncoder
    ) {
        $this->entityManager = $entityManager;
        $this->jwtManager = $jwtManager;
        $this->jwtEncoder = $jwtEncoder;
        $this->passwordHasher = $passwordHasher;
        $this->validator = $validator;
    }

    // Méthode pour gérer l'enregistrement
public function register(Request $request): JsonResponse
{
    $data = json_decode($request->getContent(), true);
    
    // Vérifiez que l'email et le mot de passe sont fournis
    if (!isset($data['email'], $data['password'], $data['firstname'], $data['name'])) {
        return new JsonResponse(['error' => 'Tous les champs sont requis.'], 400);
    }

    // Vérifiez si l'utilisateur existe déjà
    $existingUser = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);
    if ($existingUser) {
        if (in_array('ROLE_EMAIL', $existingUser->getRoles())) {
            // Modifier les informations de l'utilisateur existant
            $existingUser->setPassword(password_hash($data['password'], PASSWORD_BCRYPT)); // Hashage du mot de passe
            $existingUser->setFirstname($data['firstname']);
            $existingUser->setLastname($data['name']);
            $existingUser->setRoles([]);
            $existingUser->setBio('Je m\'appelle ' . $existingUser->getFirstname() . ' ' . $existingUser->getLastname() . ', et je suis un utilisateur de l\'application.');
            $existingUser->setAge(0);

            // Mettre à jour les événements utilisateur relatifs à l'utilisateur
            $events = $this->entityManager->getRepository(UserEvent::class)->findBy(['user' => $existingUser]);
            foreach ($events as $event) {
                $event->setValidation(true);
            }

            $this->entityManager->persist($existingUser);
            $this->entityManager->flush();

            // Générer un token JWT pour l'utilisateur mis à jour
            $token = $this->jwtManager->create($existingUser);
            setcookie('token', $token, time() + 3600, '/', 'localhost', true, true);

            return new JsonResponse(200);
        } else {
            return new JsonResponse(['error' => 'Cet email est déjà utilisé.'], 400);
        }
    }

    // Créer un nouvel utilisateur
    $user = new User();
    $user->setEmail($data['email']);
    $user->setPassword(password_hash($data['password'], PASSWORD_BCRYPT)); // Hashage du mot de passe
    $user->setFirstname($data['firstname']);
    $user->setLastname($data['name']);
    $user->setBio('Je m\'appelle ' . $user->getFirstname() . ' ' . $user->getLastname() . ', et je suis un utilisateur de l\'application.');
    $user->setAge(0);

    // Persister l'utilisateur
    $this->entityManager->persist($user);
    $this->entityManager->flush();

    // Générer un token JWT pour l'utilisateur nouvellement enregistré
    $token = $this->jwtManager->create($user);
    setcookie('token', $token, time() + 3600, '/', 'localhost', true, true);

    return new JsonResponse(201);
}

    // Méthode pour gérer la connexion
    public function login(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $this->getUserRepository()->findOneBy(['email' => $data['email']]);

        if (!$user || !$this->passwordHasher->isPasswordValid($user, $data['password'], null)) {
            throw new BadCredentialsException('Invalid credentials');
        }

        if (!$user->isActive()) {
            return new JsonResponse(['error' => 'Account is not active'], 401);
        }

        // Créer le token JWT
        $token = $this->jwtManager->create($user);
        setcookie('token', $token, time() + 3600, '/', 'localhost', true, true);
        return new JsonResponse(200);
    }

    public function logout(): JsonResponse
    {
        setcookie('token', '', time() - 3600, '/', 'localhost', true, true);
        return new JsonResponse(200);
    }

    private function getUserRepository()
    {
        return $this->entityManager->getRepository(User::class);
    }

    public function logged(Request $request): JsonResponse
    {
        // Récupérer le token depuis le cookie
        $token = $request->cookies->get('token');

        if (!$token) {
            return new JsonResponse(['error' => 'Token not found'], 401);
        }

        $data = $this->jwtEncoder->decode($token);
        $user = $this->getUserRepository()->findOneBy(['email' => $data['username']]);

        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }

        if (!$user->isActive()) {
            return new JsonResponse(['error' => 'Account is not active'], 401);
        }

        // Retourner un tableau avec les propriétés nécessaires
        return new JsonResponse([
            'id' => $user->getId(),
            'firstname' => $user->getFirstname(),
            'lastname' => $user->getLastname(),
            'email' => $user->getEmail(),
            'age' => $user->getAge(),
            'bio' => $user->getBio(),
            'roles' => $user->getRoles(),
            'profile_pic' => $user->getProfilePicture()
        ]);

    }

    public function isAdmin(Request $request) {
        $token = $request->cookies->get('token');

        if (!$token) {
            return new JsonResponse(['error' => 'Token not found'], 401);
        }

        $data = $this->jwtEncoder->decode($token);
        $user = $this->getUserRepository()->findOneBy(['email' => $data['username']]);

        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }

        if (in_array('ROLE_ADMIN', $user->getRoles())) {
            return new JsonResponse(['isAdmin' => true], 200);
        }

        return new JsonResponse(['isAdmin' => false], 401);
    }

}