# Persistance des données avec MongoDB et Mongoose ODM

##  Description

Ce projet consiste à développer une API REST avec **Node.js**, **Express.js**, **MongoDB** et **Mongoose** afin de gérer des utilisateurs et des articles avec une base de données persistante.

Contrairement au stockage en mémoire, les données restent enregistrées dans MongoDB même après le redémarrage du serveur.

##  Technologies utilisées

- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- Postman
- MongoDB Compass
- Git et GitHub

##  Fonctionnalités

### Gestion des utilisateurs
- Créer un utilisateur.
- Consulter tous les utilisateurs.
- Consulter un utilisateur par son identifiant.
- Supprimer un utilisateur.
- Filtrer les utilisateurs par rôle.
- Valider les données et empêcher les doublons d'e-mail.

### Gestion des articles
- Créer un article lié à un utilisateur.
- Consulter tous les articles.
- Consulter un article par son identifiant.
- Modifier un article.
- Supprimer un article.
- Afficher les informations de l'auteur avec Mongoose `.populate()`.

### Gestion des erreurs
- `400 Bad Request` : identifiant MongoDB invalide.
- `404 Not Found` : utilisateur ou article introuvable.
- `409 Conflict` : adresse e-mail déjà utilisée.
- `500 Internal Server Error` : erreur serveur.

##  Structure du projet

```text
mon-api-blog/
├── config/
│   └── db.js
├── controllers/
│   ├── userController.js
│   └── ArticleController.js
├── models/
│   ├── userModel.js
│   └── articleModel.js
├── routes/
│   ├── userRoutes.js
│   └── articleRoutes.js
├── utils/
│   └── validators.js
├── .env
├── .gitignore
├── package.json
└── server.js
```

##  Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/hiba255/Persistance-des-Donnees-avec-MongoDB-Atlas-et-Mongoose-ODM-.git
```

### 2. Accéder au projet

```bash
cd Persistance-des-Donnees-avec-MongoDB-Atlas-et-Mongoose-ODM-
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Configurer les variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
MONGODB_URI=mongodb://127.0.0.1:27017/mon-api-blog
PORT=3000
```

Cette configuration utilise MongoDB en local. Assurez-vous que le serveur MongoDB est démarré.

### 5. Démarrer l'application

```bash
npm run dev
```

L'API sera accessible à l'adresse :

`http://localhost:3000`

##  Endpoints de l'API

### Utilisateurs — `/api/users`

| Méthode | Endpoint | Description |
|---|---|---|
| POST | `/api/users` | Créer un utilisateur |
| GET | `/api/users` | Consulter tous les utilisateurs |
| GET | `/api/users/:id` | Consulter un utilisateur |
| DELETE | `/api/users/:id` | Supprimer un utilisateur |

Filtrage possible par rôle : `GET /api/users?role=user`

### Articles — `/api/articles`

| Méthode | Endpoint | Description |
|---|---|---|
| POST | `/api/articles` | Créer un article |
| GET | `/api/articles` | Consulter tous les articles |
| GET | `/api/articles/:id` | Consulter un article |
| PUT | `/api/articles/:id` | Modifier un article |
| DELETE | `/api/articles/:id` | Supprimer un article |

##  Tests avec Postman

Les tests permettent de vérifier :

- La création d'un utilisateur et d'un article associé.
- La consultation des articles avec les informations de l'auteur grâce à `.populate()`.
- Le rejet d'une adresse e-mail déjà utilisée avec le statut `409 Conflict`.
- La gestion d'un identifiant mal formé avec le statut `400 Bad Request`.
- La persistance des données dans MongoDB après le redémarrage du serveur.

##  Vérification avec MongoDB Compass

MongoDB Compass permet de visualiser la base `mon-api-blog` et ses deux collections :

- `users` : documents des utilisateurs.
- `articles` : documents des articles et références vers leurs auteurs.

##  Sécurité

- Le fichier `.env` ne doit pas être publié sur GitHub.
- Le dossier `node_modules/` ne doit pas être versionné.
- Le fichier `.gitignore` doit exclure ces éléments.

##  Licence

Projet réalisé dans un cadre pédagogique.
