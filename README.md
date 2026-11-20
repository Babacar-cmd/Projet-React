# Teranga Blog

Application web monopage (SPA) développée avec **React**, **Vite** et **React Router** (`react-router`), permettant de consulter des articles, explorer les profils des auteurs, gérer une liste de favoris partagée, publier des commentaires locaux et accéder à un espace membre protégé.

## Fonctionnalités

- **Navigation multi-pages et routes dynamiques** : Accueil (`/`), liste et recherche d’articles (`/articles`), détail d’un article (`/articles/:id`), liste des auteurs (`/auteurs`), fiche auteur (`/auteurs/:id`), favoris (`/favoris`), connexion (`/connexion`), espace personnel protégé (`/mon-espace`) et page 404 (`*`).
- **État global léger via `Outlet`** : partage des favoris (`favoris`, `estFavori`, `toggleFavori`, `nombreFavoris`) et de l’état utilisateur (`utilisateur`, `connexion`, `deconnexion`) depuis `LayoutPrincipal` grâce à `useOutletContext`.
- **Gestion propre des appels réseau** : prise en charge des états de chargement, des erreurs HTTP/réseau, de la validation des paramètres d’URL (`useParams`) et de l’annulation des requêtes en cours via `AbortController`.
- **Commentaires locaux** : ajout dynamique de commentaires sur chaque article avec validation des champs.
- **Authentification simulée & route protégée (Niveau Or)** : connexion par formulaire avec redirection automatique via `<Navigate>` si un visiteur non connecté tente d’accéder à `/mon-espace`.

## Lancer le projet en local

1. Installer les dépendances :
   ```bash
   npm install