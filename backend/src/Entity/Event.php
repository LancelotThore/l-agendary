<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use App\Repository\EventRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\EventController;
use App\Controller\UserController;

#[ORM\Entity(repositoryClass: EventRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            name: 'highlighted-events',
            uriTemplate: '/highlighted-events',
            controller: EventController::class . '::highlightedEvents',
            // outputFormats: ['json' => ['application/ld+json']],
        ),
        new GetCollection(
            name: 'paginated-events',
            uriTemplate: '/paginated-events',
            controller: EventController::class . '::paginatedEvents',
            // outputFormats: ['json' => ['application/ld+json']],
        ),
        new Get(
            name: 'nb-public-events',
            uriTemplate: '/nb-public-events',
            controller: EventController::class . '::nbPublicEvents',
        ),
        new GetCollection(
            name: 'search-events',
            uriTemplate: '/search-events',
            controller: EventController::class . '::searchEvents',
            // outputFormats: ['json' => ['application/ld+json']],
        ),
        new Post(
            name: 'join-event',
            uriTemplate: '/events/join/{id}',
            controller: EventController::class . '::joinEvent',
        ),
        new Delete(
            name: 'leave-event',
            uriTemplate: '/events/leave/{id}',
            controller: EventController::class . '::leaveEvent',
        ),
        new Get(
            name: 'is-user-registered',
            uriTemplate: '/users/is-registered/{id}',
            controller: UserController::class . '::isUserRegisteredToEvent',
            read: false
        ),
        new Get(), // Get one event by ID
        new GetCollection(), // Get all events
        new Post(), // Create a new event
        new Patch(), // Patch an event
        new Delete(), // Delete an event
    ]
)]
class Event
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\Column]
    private ?bool $privacy = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $start_date = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $end_date = null;

    #[ORM\Column(length: 255)]
    private ?string $location = null;

    #[ORM\ManyToOne(inversedBy: 'created_events')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $creator = null;

    /**
     * @var Collection<int, User>
     */
    #[ORM\ManyToMany(targetEntity: User::class, inversedBy: 'registered_events')]
    private Collection $registered_users;

    #[ORM\Column(length: 255)]
    private ?string $image = null;

    public function __construct()
    {
        $this->registered_users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function isPrivacy(): ?bool
    {
        return $this->privacy;
    }

    public function setPrivacy(bool $privacy): static
    {
        $this->privacy = $privacy;

        return $this;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->start_date;
    }

    public function setStartDate(\DateTimeInterface $start_date): static
    {
        $this->start_date = $start_date;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->end_date;
    }

    public function setEndDate(\DateTimeInterface $end_date): static
    {
        $this->end_date = $end_date;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): static
    {
        $this->location = $location;

        return $this;
    }

    public function getCreator(): ?User
    {
        return $this->creator;
    }

    public function setCreator(?User $creator): static
    {
        $this->creator = $creator;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getRegisteredUsers(): Collection
    {
        return $this->registered_users;
    }

    public function addRegisteredUser(User $registeredUser): static
    {
        if (!$this->registered_users->contains($registeredUser)) {
            $this->registered_users->add($registeredUser);
        }

        return $this;
    }

    public function removeRegisteredUser(User $registeredUser): static
    {
        $this->registered_users->removeElement($registeredUser);

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }
}
