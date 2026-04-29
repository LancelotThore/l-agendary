# L'Agendary

Projet étudiant réalisé en groupe dans le cadre de notre formation. L'Agendary est une application web de gestion d'événements permettant aux utilisateurs de créer, rejoindre et gérer des événements, avec un calendrier personnel et un espace d'administration.

## Screenshots

<img width="354" alt="Page d'accueil" src="https://github.com/user-attachments/assets/b2573138-699d-4197-91d1-e9a11d87d2c9" />
<img width="354" alt="Page créer un nouvel événement" src="https://github.com/user-attachments/assets/d7806fe0-d074-4852-8c28-0945b9cdb370" />
<img width="354" alt="Page recherche événement" src="https://github.com/user-attachments/assets/8a3546b1-8d4e-45aa-b455-610e8cef5291" />
<img width="354" alt="Page calendrier" src="https://github.com/user-attachments/assets/84c3152a-3219-47f4-b1e0-5a00c0b9b720" />
<img width="354" alt="Page profil utilisateur" src="https://github.com/user-attachments/assets/97fcfc59-67b1-4f3e-9432-7c22a4ddf445" />

## Stack technique

| Couche          | Technologies                                   |
| --------------- | ---------------------------------------------- |
| Frontend        | Next.js 14, React 18, TypeScript, Tailwind CSS |
| Backend         | Symfony 7, PHP 8.3, Doctrine ORM               |
| Auth            | JWT (LexikJWTAuthenticationBundle)             |
| Base de données | MySQL 8                                        |
| Infrastructure  | Docker, FrankenPHP, Caddy                      |
| Mailing         | Symfony Mailer                                 |
| Admin           | EasyAdmin                                      |

## Fonctionnalités

- Inscription et connexion avec authentification JWT
- Création, modification et suppression d'événements
- Rejoindre / quitter un événement
- Calendrier personnel affichant les événements de l'utilisateur
- Page de recherche avec filtres (date, lieu, créateur, pagination)
- Gestion des photos de profil et des images d'événements
- Événements privés avec lien d'invitation par email
- Mot de passe oublié / réinitialisation
- Interface d'administration (backoffice)
- Mentions légales et politique de confidentialité

## Lancer le projet en local

### Prérequis

- [Docker](https://www.docker.com/) (v2.10+)

### 1. Cloner le repo

```bash
git clone https://github.com/LancelotThore/l-agendary.git
cd l-agendary
```

### 2. Configurer le backend

```bash
cd backend
cp .env.example .env
```

Édite `.env` et renseigne tes propres valeurs pour :

- `APP_SECRET` — une chaîne aléatoire de 32 caractères
- `JWT_PASSPHRASE` — une passphrase de ton choix
- `MAILER_DSN` — ta configuration email

Puis lance Docker :

```bash
docker compose up --build
```

### 3. Générer les clés JWT

```bash
docker exec -it app-php bash
php bin/console lexik:jwt:generate-keypair
exit
```

### 4. Lancer les migrations

```bash
docker exec -it app-php bash
php bin/console doctrine:migrations:migrate
exit
```

### 5. Accéder à l'application

| Service       | URL                     |
| ------------- | ----------------------- |
| Frontend      | https://localhost:3000  |
| Backend (API) | https://localhost       |
| PhpMyAdmin    | http://localhost:8080   |
| Admin         | https://localhost/admin |

> ⚠️ Le backend utilise des certificats TLS auto-générés. Avant d'ouvrir le frontend, visite d'abord [https://localhost](https://localhost) et accepte l'avertissement de sécurité dans ton navigateur, sinon les appels API seront bloqués.

### 6. Créer un compte administrateur

Connecte-toi à PhpMyAdmin (`root` / `root`) et attribue le rôle admin à un utilisateur :

```json
["ROLE_USER", "ROLE_ADMIN"]
```
