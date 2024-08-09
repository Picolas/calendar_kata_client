# Calendar
 
<b>Un calendrier permettant de gérer des événements avec une vue mensuelle.</b>

## Docker

Le projet utilise Docker afin de lancer les différents services nécessaires au bon fonctionnement de l'application.

Si Docker n’est pas installé sur votre machine, vous pouvez le télécharger à l’adresse suivante : [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

## Lancer l'application

Pour lancer l'application il suffit d'exécuter la commande suivante à la racine du projet :

```
docker compose up --build
```

Au premier lancement il se peut que le serveur en back-end s’arrête en raison de la base de données qui n’est pas encore prête. Il suffit de relancer la commande précédente.

## Accéder à l'application

Une fois les services lancés, vous pouvez accéder à l'application à l'adresse suivante :

```
http://localhost:4200
```

## Structure du projet

Le projet est divisé en deux parties :

- `frontend` : le front-end de l'application, développé en Angular
- `backend` : le back-end de l'application, développé en Express, utilisant une base de données PostgreSQL avec Prisma comme ORM
- `docker-compose.yml` : le fichier de configuration Docker permettant de lancer les différents services nécessaires au bon fonctionnement de l'application

## Comptes utilisateurs

Différents comptes utilisateurs sont disponibles pour tester l'application :

| Email                | Mot de passe         |
|----------------------|----------------------|
| `npiplard@gmail.com` | `npiplard@gmail.com` |
| `rosa@gmail.com`     | `rosa@gmail.com`     |
| `alberto@gmail.com`  | `alberto@gmail.com`  |
| `test@gmail.com`     | `test@gmail.com`     |
| `test2@gmail.com`    | `test2@gmail.com`    |

Vous pouvez bien sûr créer un compte utilisateur en vous inscrivant sur l'application.

## Auteur
[Nicolas PIPLARD](https://nicolaspiplard.fr) - [nicolaspiplard.fr](https://nicolaspiplard.fr)

