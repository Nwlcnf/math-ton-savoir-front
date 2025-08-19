Math Ton Savoir – Frontend
==========================

Frontend de l’application **Math Ton Savoir**, une plateforme d’aide aux devoirs en mathématiques pour collégiens.

Ce frontend est développé en **Angular 20**, avec un design basé sur **Angular Material**, et intègre une pipeline **CI/CD GitHub Actions** avec suivi des erreurs via **Sentry**.

Table des matières
------------------

*   [Prérequis](#prérequis)
    
*   [Installation et exécution locale](#installation-et-exécution-locale)
    
*   [Configuration](#configuration)
    
*   [CI/CD](#cicd)
    
*   [Tests et coverage](#tests-et-coverage)
    
*   [Monitoring et erreurs (Sentry)](#monitoring-et-erreurs-sentry)
    
    
*   [Contribuer](#contribuer)
    

Prérequis
---------

*   Node.js (LTS recommandé)
    
*   Angular CLI (npm install -g @angular/cli)
    
*   Git
    
*   Compte Sentry (pour le suivi des erreurs)
    

Installation et exécution locale
--------------------------------

1.  git clone https://github.com/Nwlcnf/math-ton-savoir-front.gitcd math-ton-savoir-front
    
2.  npm install
    
3.  npm startL’application sera disponible sur : [http://localhost:4200](http://localhost:4200).
    
4.  npm run buildLes fichiers compilés se trouvent dans le dossier dist/.
    

Configuration
-------------

### Variables d’environnement

Le projet utilise **Sentry** pour le suivi des erreurs. Les variables nécessaires sont :

*   SENTRY\_AUTH\_TOKEN : Token d’authentification Sentry
    
*   SENTRY\_ORG : Organisation Sentry (ex. nawel-h2)
    
*   SENTRY\_PROJECT : Nom du projet Sentry (ex. math-ton-savoir-front)
    

⚠️ Ces variables sont stockées dans les **secrets GitHub Actions** et ne doivent jamais être commit dans le code.

CI/CD
-----

La **pipeline CI/CD** est configurée via **GitHub Actions** et comprend :

*   Installation des dépendances Node.js
    
*   Exécution des tests unitaires Jest
    
*   Vérification du coverage minimal (80 %)
    
*   Build Angular
    
*   Upload des sourcemaps vers Sentry
    

Workflow principal : .github/workflows/ci.yml

Tests et coverage
-----------------

Les tests unitaires utilisent **Jest** avec jest-preset-angular.

*   npm test
    
*   npm run test:coverage
    

👉 Si le coverage global < 80 %, la build échoue dans GitHub Actions.👉 Rapport disponible dans coverage/.

Monitoring et erreurs (Sentry)
------------------------------

Le projet utilise **Sentry** pour :

*   Suivre les erreurs en production
    
*   Uploader les **sourcemaps** pour un débogage lisible
    

Commandes utiles :

`   # Injecter et uploader les sourcemaps  npm run sentry:sourcemaps   `

`

Contribuer
----------

1.  Forker le projet
    
2.  Créer une branche feature/xxx
    
3.  Commit & push vos changements
    
4.  Ouvrir un Pull Request sur main
