# Sample Heroku App

Exemple minimaliste d'application déployable sur Heroku.
Le déploiement se fait directement depuis le dépôt git
fournit par Heroku (on pourrait aussi le faire depuis GitHub).

## Développement

En local, le serveur est démarré avec la commande `npm start`.
Il écoute alors les requêtes http sur le port 3000.

## Test

Les méthodes de l'api sont testables dans un navigateur,
sauf pour le stockage de données. On peut alors utiliser
un client type postman ou curl :
```
curl --header "Content-Type: application/json" --request POST \
  --data '{"key":"key","value":"value"}' http://localhost:3000/store/
```

## Déploiement

Le déploiement depuis le poste de développement nécessite heroku-cli.

```
% heroku create 
% git push heroku master
...
remote: Compressing source files... done.
remote: Building source:
remote: 
remote: -----> Building on the Heroku-20 stack
remote: -----> Determining which buildpack to use for this app
remote: -----> Node.js app detected
...
remote: -----> Launching...
remote:        Released v3
remote:        https://intense-coast-324434.herokuapp.com/ deployed to Heroku
remote: 
remote: Verifying deploy... done.
To https://git.heroku.com/intense-coast-324434.git
 * [new branch]      master -> master
```

### Workflow

Une fois commité sur le repo git, Heroku lance le build.
La commande `npm run build` est exécutée pour constuire le livrable,
qui est installé et démarré avec la commande `npm start`.
