# Projet Tech Web 2 - Bibliothèque des séries Kamen Rider de 2000 à 2024

**Auteur** : Raffaele Martello

## Description du Projet
Ce projet consiste à développer un site web qui répertorie toutes les séries Kamen Rider diffusées entre 2000 et 2024. Le site inclura :
- Les épisodes associés à chaque série. (En raison de la simulation des données, tous les épisodes ne sont pas affichés, bien que toutes les séries soient présentes).
- Une fonctionnalité permettant aux administrateurs d'ajouter et de supprimer des séries et des épisodes.
- Un accès réservé aux membres connectés pour la visualisation du contenu. (Voir en bas du README pour les identifiants de connexion).

## Technologies Utilisées
- **Stockage des données** : Fichiers JSON.
- **Langages** :
  - TypeScript pour la logique.
  - HTML/CSS pour l'affichage.

## Technologies Non-Utilisées
- **Architecture MVC** (Modèle-Vue-Contrôleur).
- **Tests unitaires** : Framework JEST.

## Organisation du Projet
### Répertoires
- `src/` : Code source.
- `dist/` : Fichiers compilés (TypeScript vers JavaScript).
- `assets/` : Ressources (images, fichiers CSS).

### Branches Git
- **main** : Branche stable.
- **dev** : Branche pour le développement actif.

## Problèmes Connus
**Note** : Dans la page admin, les options d'ajout et de suppression fonctionnent, mais il faut simplement re-sélectionner les séries dans les sélecteurs déroulants pour que les actions soient prises en compte.

## Identifiants pour le Test du Projet
Afin de tester correctement le projet, voici les identifiants nécessaires :
### Identifiants de Connexion
- **Membre Test 1** :
  - Nom d'utilisateur : `admin`
  - Mot de passe : `admin123`
  
- **Admin Test** :
  - Nom d'utilisateur : `membre`
  - Mot de passe : `membre123`

Ces identifiants permettent de simuler l'accès pour un utilisateur standard et un administrateur pour tester les fonctionnalités de connexion et d'administration.
