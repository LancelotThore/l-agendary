# Informations Pratiques

### Pour ouvrir le projet en mode développement :

1. **Se placer dans le dossier backend** :
   ```sh
   cd backend
   ```

2. **Lancer Docker Compose avec reconstruction des conteneurs** :
   ```sh
   docker-compose up --build
   ```

3. **Ouvrir un Shell dans le conteneur back du projet (app-php)** :
   ```sh
   docker exec -it app-php bash
   ```

4. **Lancer les migrations de la base de données** :
   ```sh
   php bin/console doctrine:migrations:migrate
   ```

5. **Accéder au front & au back pour accepter le risque de sécurité** :
   - Problème lié aux certificats auto-générés.

6. **Ajouter des données initiales** :
   - Voir [data.md](./data.md).

6. **Accèder à la page administrateur** :
   - Vous devez renseigner un rôle admin dans phpmyadmin à l'adresse : [http://localhost:8080/](http://localhost:8080/)
   - Les informations à renseigner dans le rôle de l'utilisateur est : ```["ROLE_USER", "ROLE_ADMIN"]```
   - *Utilisateur: root*
   - *Mot de passe: root*


---

# Fonctionnalités Implémentées

### Période : 02/12/2024 - 06/12/2024
- Ajout des événements auquel l'utilisateur connecté participe et si il est le créateur sur le calendrier
- Ajout de l'inscription par email avec désinscription
- Popup de cookies
- Revue du footer avec page politique de confidentialité et mentions légales
- Amélioration du filtrage par location et par créateur sur la page recherche


### Période : 25/11/2024 - 29/11/2024
- Le backoffice https://localhost/admin
- La fonction de recherche fonctionnel avec la pagination
- Suppression d'un event par son créateur sur la page de l'event
- Intégration page 404
- Intégration du calendrier seulement


### Période : 17/11/2024 - 22/11/2024
- rejoindre et quitter un événements en tant qu'utilisateur connecté
- Sauvegarde l'image de l'event à la création de celui-ci dans ./frontend/public/uploads/events_pictures
- Possibilité de modifier un évènement lorsque c'est l'évènement du créateur
- Ajout d'une flèche pour revenir en arrière
- Ajout des filtres sur la page recherche ( searchBar, date, lieu, créateur)
- Probléme de Pagination aprés une recherche



### Période : 12/11/2024 - 15/11/2024
_(Inclut les fonctionnalités présentes avant cette semaine)_

- Page de recherche : Intégration des requêtes pour les événements.
- Page d’accueil : Affichage des événements mis en avant.
- Page profil : Modification des informations utilisateur.
- Page événement : Requêtes de données pour l'événement et son organisateur.
- Déconnexion
- Connexion
- Création de compte
- Création d'événement
- Squelettes des cartes d'événements
- Squelettes de la page d'événement
- Spinner de chargement dans les boutons de login et register

