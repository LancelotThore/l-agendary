Events fictifs (après avoir créer un utilisateur via le register de l'application)

INSERT INTO event (creator_id, title, description, privacy, start_date, end_date, location, image) VALUES
(1, 'Concert en plein air', 'Un concert en plein air avec des musiciens locaux.', 1, '2024-11-05 18:00:00', '2024-11-05 21:00:00', 'Parc Central', 'paysage.webp'),
(1, 'Marché de Noël', 'Marché de Noël avec des stands artisanaux et de la nourriture festive.', 1, '2024-11-10 10:00:00', '2024-11-10 18:00:00', 'Place du Marché', 'paysage.webp'),
(1, 'Soirée jeux de société', 'Soirée jeux de société pour tous les âges, avec des prix à gagner.', 1, '2024-11-18 18:00:00', '2024-11-18 23:00:00', 'Café Ludique', 'paysage.webp'),
(1, 'Festival du film indépendant', 'Projection de films indépendants suivis de discussions.', 2, '2024-11-24 14:00:00', '2024-11-24 18:00:00', 'Cinéma Le Studio', 'paysage.webp'),

(2, 'Atelier de peinture', 'Venez participer à un atelier de peinture pour débutants.', 2, '2024-11-06 14:00:00', '2024-11-06 17:00:00', 'Centre culturel', 'paysage.webp'),
(2, 'Séance de méditation', 'Séance de méditation guidée pour se détendre.', 1, '2024-11-13 07:30:00', '2024-11-13 08:30:00', 'Studio Zen', 'paysage.webp'),
(2, 'Dîner caritatif', 'Dîner organisé pour récolter des fonds pour les sans-abris.', 1, '2024-11-21 19:00:00', '2024-11-21 22:00:00', 'Restaurant Le Bonheur', 'paysage.webp'),
(2, 'Balade en forêt', 'Venez profiter d\'une balade en forêt guidée pour découvrir la nature.', 1, '2024-11-25 10:00:00', '2024-11-25 13:00:00', 'Forêt de Chantilly', 'paysage.webp'),
(2, 'Compétition de cuisine', 'Concours de cuisine avec des chefs amateurs et professionnels.', 1, '2024-11-29 10:00:00', '2024-11-29 15:00:00', 'Salle des Fêtes', 'paysage.webp'),

(3, 'Conférence sur l\'innovation', 'Conférence sur les dernières innovations technologiques.', 2, '2024-11-12 09:00:00', '2024-11-12 12:00:00', 'Salle des Congrès', 'paysage.webp'),
(3, 'Séminaire sur la santé mentale', 'Séminaire sur la gestion du stress et l\'équilibre émotionnel.', 2, '2024-11-20 13:00:00', '2024-11-20 17:00:00', 'Université', 'paysage.webp'),
(3, 'Spectacle de danse contemporaine', 'Un spectacle de danse avec des chorégraphies modernes et innovantes.', 1, '2024-11-23 20:00:00', '2024-11-23 22:00:00', 'Théâtre National', 'paysage.webp'),
(3, 'Café littéraire', 'Rencontre autour de livres et de discussions littéraires.', 2, '2024-11-28 15:00:00', '2024-11-28 17:00:00', 'Café des Arts', 'paysage.webp'),

(4, 'Exposition d\'art moderne', 'Exposition d\'art moderne avec des artistes contemporains.', 2, '2024-11-15 11:00:00', '2024-11-15 19:00:00', 'Musée d\'Art', 'paysage.webp'),
(4, 'Séance de yoga en plein air', 'Séance de yoga en plein air pour tous niveaux.', 2, '2024-11-22 08:00:00', '2024-11-22 09:00:00', 'Jardin Botanique', 'paysage.webp'),
(4, 'Cours de cuisine italienne', 'Apprenez à cuisiner des plats typiques de la cuisine italienne.', 1, '2024-11-26 18:00:00', '2024-11-26 21:00:00', 'École de Cuisine', 'paysage.webp'),
(4, 'Projection de film en plein air', 'Projection de films classiques en plein air sous les étoiles.', 1, '2024-11-30 20:00:00', '2024-11-30 23:00:00', 'Place du Parc', 'paysage.webp');

(5, 'Course de 5km', 'Participez à une course de 5 kilomètres pour soutenir une cause caritative.', 1, '2024-11-17 08:00:00', '2024-11-17 10:00:00', 'Parc de la Ville', 'paysage.webp'),
(5, 'Festival de musique électronique', 'Festival de musique électronique avec des DJ internationaux.', 2, '2024-11-27 22:00:00', '2024-11-28 05:00:00', 'Salle de concert Zenith', 'paysage.webp'),

Pour que le mailer marche, dans le .env.local (pas dans le .env pour ne pas push) :
MAILER_DSN=gmail+smtp://{adressegmail}:{motdepasse}@smtp.gmail.com
