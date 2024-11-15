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

### Période : 12/11/2024 - 15/11/2024
_(Inclut les fonctionnalités présentes avant cette semaine)_

- Page de recherche : Intégration des requêtes pour les événements.
- Page d’accueil : Affichage des événements mis en avant.
- Page profil : Modification des informations utilisateur.
- Page événement : Requêtes de données pour l'événement et son organisateur.
- Déconnexion : Fonctionnalité de déconnexion utilisateur.
- Connexion : Fonctionnalité d’authentification.
- Création de compte : Interface d’inscription utilisateur.
- Création d'événement : Interface pour créer un nouvel événement.
- Squelettes des cartes d'événements : Base de la présentation visuelle des cartes.

