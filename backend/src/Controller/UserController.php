<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use App\Entity\Event;

class UserController extends AbstractController
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

    // Function to know if the user is logged
    public function isLogged(Request $request) 
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

        return $user;
    }

    // Function to get user repository
    private function getUserRepository()
    {
        return $this->entityManager->getRepository(User::class);
    }

    public function updateProfile(Request $request): Response
    {
        $user = $this->isLogged($request);
        if (!$user instanceof User) {
            return $user; // Retourne la réponse d'erreur de isLogged
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['firstname'])) {
            $user->setFirstname($data['firstname']);
        }

        if (isset($data['lastname'])) {
            $user->setLastname($data['lastname']);
        }

        if (isset($data['age']) && is_int($data['age'])) {
            $user->setAge($data['age']);
        }
        else {
            return new JsonResponse(['error' => 'Invalid age'], 400);
        }

        if (isset($data['bio'])) {
            $user->setBio($data['bio']);
        }

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Profile updated successfully']);
    

    }

    public function updateSettings(Request $request): Response
    {
        $user = $this->isLogged($request);
        if (!$user instanceof User) {
            return $user; // Retourne la réponse d'erreur de isLogged
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['email'])) {
            $user->setEmail($data['email']);
        }

        if (isset($data['password']) && isset($data['newPassword'])) {
            if ($this->passwordHasher->isPasswordValid($user, $data['password'])) {
                $newPassword = $this->passwordHasher->hashPassword($user, $data['newPassword']);
                $user->setPassword($newPassword);

                $this->entityManager->persist($user);
                $this->entityManager->flush();

                return new JsonResponse(['message' => 'Profile updated successfully']);

            } else {
                return new JsonResponse(['error' => 'Invalid current password'], 400);
            }
        }

        return new JsonResponse(['error' => 'An error has occured'], 400);
    }


    public function updateImage(Request $request): Response
    {
        $user = $this->isLogged($request);
        if (!$user instanceof User) {
            return $user; // Retourne la réponse d'erreur de isLogged
        }

        $data = json_decode($request->getContent(), true);
        $imageUrl = $data['imageUrl'] ?? null;

        if ($imageUrl) {
            $user->setProfilePicture($imageUrl);
            $this->entityManager->flush();
            return new JsonResponse(['success' => 'Profile picture updated successfully']);
        }

        return new JsonResponse(['error' => 'Invalid image URL'], 400);
    }

        /**
 * @Route("/api/unique-user-names", name="unique-user-names", methods={"GET"})
 */
public function getUniqueUserNames(EntityManagerInterface $entityManager): Response
{
    $queryBuilder = $entityManager->getRepository(User::class)
        ->createQueryBuilder('u')
        ->select('DISTINCT u.firstname');

    $userNames = $queryBuilder->getQuery()->getResult();

    return $this->json($userNames);
}

public function isUserRegisteredToEvent(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
{
    $user = $this->isLogged($request);
    if (!$user instanceof User) {
        return $user; // Retourne la réponse d'erreur de isLogged
    }

    // Utilisation de DQL pour charger explicitement la relation userEvents
    $event = $entityManager->getRepository(Event::class)
                           ->createQueryBuilder('e')
                           ->leftJoin('e.userEvents', 'ue')
                           ->addSelect('ue')
                           ->where('e.id = :id')
                           ->setParameter('id', $id)
                           ->getQuery()
                           ->getOneOrNullResult();

    if (!$event) {
        return new JsonResponse(['error' => 'Event not found'], 404);
    }

    $isRegistered = false;

    // Vérifier si l'utilisateur est enregistré à l'événement
    foreach ($event->getUserEvents() as $userEvent) {
        if ($userEvent->getUser()->getId() === $user->getId()) {
            $isRegistered = true;
            break;
        }
    }

    return new JsonResponse(['isRegistered' => $isRegistered]);
}

    
}
