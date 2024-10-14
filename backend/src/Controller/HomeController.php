<?php


// src/Controller/HomeController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;



class HomeController extends AbstractController
{
    private $security;

    public function __construct(Security $security)
    {
       $this->security = $security;
    }

    public function index()
    {

        return $this->render("base.html.twig",[

            'user' => $this->security->getUser()
        ]);
    }

}