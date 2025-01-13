# Application Météo - React

## Contexte
Ce projet, réalisé dans le cadre de mon **BTS SIO SLAM** via la plateforme **Microlead**, consiste en la création d'une **application météo** en React. 
L'application permet à l'utilisateur de saisir une ville, récupère la météo via l'API OpenWeatherMap et l'affiche dynamiquement. 
L'application permet également de basculer entre l'affichage de la météo en temps réel et les prévisions sur cinq jours.

## Fonctionnalités
- **Saisie de la ville** : L'utilisateur entre le nom d'une ville.
- **Récupération des données météo** : Appel à l'API OpenWeatherMap pour récupérer les informations météorologiques.
- **Affichage dynamique** : Affichage de la météo actuelle ou des prévisions sur 5 jours.
- **Design minimaliste** : Bien que non obligatoire, un minimum de design a été ajouté pour améliorer l'expérience utilisateur.

## Prérequis
Avant de pouvoir utiliser cette application, il est nécessaire de créer une clé API pour OpenWeatherMap via [OpenWeatherMap API](https://openweathermap.org/).

## Installation

Initialiser l'application react
```
npx create-react-app meteo
```

Lancer l'application
```
npm start
```

## Déploiement sur Github Pages

Installer l'utilitaire de mise en prod
```
npm install gh-pages --save-dev
```

Modifier le package.json
```
"homepage": "https://<votre-nom-utilisateur>.github.io/<nom-du-repo>",
"scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
}
```

Lancement du déploiement : 
```
npm run deploy
```
