# Port de Plaisance API

## Fonctionnalités principales

- **Gestion des catways** : Création, modification, suppression et consultation.
- **Gestion des réservations** : Création, modification, suppression et consultation.
- **Authentification des utilisateurs**.
- **Tests unitaires** avec Mocha et Chai.

## Installation et Configuration

### Prérequis

- **Node.js** (environnement d'exécution JavaScript)
- **Express** (infrastructure d'application Web)
- **Moche** (infrastructure de test)
- **MongoDB** ( base de données pour le stockage des catway et des réservations)
- **JSDoc** (Pour la documentation de l'API)

### Cloner le projet

```bash
git clone https://github.com/Valoulec/Port-de-plaisance-API.git
cd Port-de-plaisance-API
```

### Installer les dépendances

```bash
npm install
```

### Configuration de la base de données

Assurez-vous que MongoDB est en cours d'exécution et accessible sur `mongodb://127.0.0.1:27017/port-de-plaisance`. Vous pouvez modifier l'URI dans le fichier de configuration si nécessaire.

### Lancer l'application

```bash
node app.js
```

L'API tourne sur `http://localhost:3000/`

## Routes de l'API

### Catways

| Méthode | Route           | Description                   |
| ------- | --------------- | ----------------------------- |
| GET     | /catways        | Récupère tous les catways     |
| POST    | /catways        | Ajoute un nouveau catway      |
| GET     | /catways/:id    | Récupère un catway spécifique |
| POST    | /catways/:id    | Modifie un catway             |
| POST    | /catways/delete | Supprime un catway            |

### Réservations

| Méthode | Route                | Description                      |
| ------- | -------------------- | -------------------------------- |
| GET     | /reservations        | Récupère toutes les réservations |
| POST    | /reservations        | Ajoute une réservation           |
| POST    | /reservations/update | Modifie une réservation          |
| POST    | /reservations/delete | Supprime une réservation         |

### Utilisateurs (Authentification)

| Méthode | Route     | Description      |
| ------- | --------- | ---------------- |
| POST    | /login    | Authentification |
| POST    | /register | Inscription      |
| GET     | /logout   | Déconnexion      |

## Exécution des Tests

L'application est testée avec **Mocha** et **Chai**.

```bash
npm test
```

Les résultats des tests seront affichés dans la console.

## Structure du projet

```
Port-de-plaisance-API/
│-- models/          # Modèles Mongoose
│-- controllers/     # Logique des routes
│-- routes/          # Routes Express
│-- middlewares/     # Middleware d'authentification
│-- views/           # Templates EJS
│-- tests/           # Tests unitaires avec Mocha et Chai
│-- app.js           # Point d'entrée principal
│-- package.json     # Dépendances et scripts
```

