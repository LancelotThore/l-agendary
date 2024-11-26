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

---

# Fonctionnalités Implémentées

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

