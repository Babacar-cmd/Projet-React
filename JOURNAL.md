# Journal de bord — Teranga Blog

## Jalon 1 : Mise en place, composants et état local (Étapes 0 à 3)
- **Réalisations** : initialisation du projet React avec Vite, structuration des dossiers (`src/components`, `src/layouts`, `src/pages`), création des composants réutilisables (`ArticleCard`, `BarreRecherche`, `CommentaireForm`, `EtatRequete`, `ListeArticles`, `ListeCommentaires`) et mise en place de la gestion des favoris et des commentaires locaux.
- **Choix techniques** : séparation claire entre les composants d’interface réutilisables et les pages afin de faciliter la maintenance et la lecture du code.

## Jalon 2 : Routage multi-pages et chargement des données (Étapes 4 et 5)
- **Réalisations** : configuration de `createBrowserRouter` dans `src/router.jsx` avec `LayoutPrincipal` comme route parente, mise en place des routes statiques, dynamiques (`/articles/:id`, `/auteurs/:id`) et de la route de secours `*` (`Introuvable`). Connexion des pages aux données distantes avec gestion des états de chargement, d’erreur et d’annulation (`AbortController`).
- **Problèmes rencontrés et solutions** :
  - *Erreur de résolution d’import sous Vite* : `router.jsx` pointait vers `./components/LayoutPrincipal` alors que le fichier se trouvait dans `src/layouts/LayoutPrincipal.jsx`. Correction du chemin d’import et uniformisation de tous les imports de routage sur `"react-router"`.

## Jalon 3 : Finalisation, Niveau Or et déploiement (Étape 6)
- **Réalisations** :
  - Nettoyage complet du code source (`src/`) : vérification avec la recherche globale (`TODO`, `FIXME`, `XXX`), console navigateur propre sans erreur ni avertissement, et vérification qu’aucune donnée de test n’est utilisée par erreur.
  - Implémentation du **Niveau Or** : ajout de l’état `utilisateur` (`connexion`, `deconnexion`) dans `LayoutPrincipal`, création de la page `Connexion.jsx` et protection de `MonEspace.jsx` avec `<Navigate replace to="/" />`.
  - Préparation du déploiement SPA avec configuration de réécriture (`vercel.json`) pour assurer le fonctionnement du rechargement sur les adresses profondes, et rédaction de `README.md` et `JOURNAL.md`.