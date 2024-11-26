<?php


// src/Controller/HomeController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Bundle\SecurityBundle\Security;

use App\Entity\User;
use App\Repository\UserRepository;

class HomeController extends AbstractController
{
    private $security;
    private $em;

    public function __construct(Security $security, EntityManagerInterface $em)
    {
       $this->security = $security;
         $this->em = $em;
    }

    public function index()
    {
        $users = $this->em->getRepository(User::class)->findAll();

        return $this->render("base.html.twig",[

            'users' => $users,
        ]);
    }

}