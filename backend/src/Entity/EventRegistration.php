<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EventRegistrationRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\EventRegistrationController;

#[ORM\Entity(repositoryClass: EventRegistrationRepository::class)]
#[ApiResource(
    operations: [
        new Post(
            name: 'event-registration-with-mail',
            uriTemplate: '/event-registrations-with-mail',
            controller: EventRegistrationController::class . '::registerWithEmail',
        )
        new Get(), // Get one event by ID
        new GetCollection(), // Get all events
        new Post(), // Create a new event
        new Patch(), // Patch an event
        new Delete(), // Delete an event
    ]
)]
#[ORM\UniqueConstraint(columns: ["event_id", "email"])]
class EventRegistration
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Event::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?Event $event = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column]
    private ?bool $validation = null;

    #[ORM\Column(length: 255)]
    private ?string $token = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEvent(): ?Event
    {
        return $this->event;
    }

    public function setEvent(?Event $event): static
    {
        $this->event = $event;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function isValidation(): ?bool
    {
        return $this->validation;
    }

    public function setValidation(bool $validation): static
    {
        $this->validation = $validation;

        return $this;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(string $token): static
    {
        $this->token = $token;

        return $this;
    }
}
