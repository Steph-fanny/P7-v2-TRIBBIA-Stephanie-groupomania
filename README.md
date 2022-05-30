
# P7 GROUPOMANIA- Créez un réseau social d'entreprise

7 eme et dernier projet de la formation de developpeur web d'Openclassrooms. Il consiste à construire un réseau social interne pour les employés de Groupomania (developpement des parties Frontend et Backend)

## TECHNOLOGIE EFFECTUEE
 
### FrontEnd
- Framework : VueJs avec utilisation de vueCLI
- Framework Bootstrap

### BackEnd
- Serveur Node.js
- Framework Express.js
- Base de données MySQL
- ORM Sequelize


## INSTALLATION

### FrontEnd
*Installez Vue CLI : ``npm install -g @vue/cli`` (voir la documentation [vue-cli](https://cli.vuejs.org/guide/installation.html))

*Creer le projet :``vue create frontend``

*cd frontend : 
- ``npm install`` pour l'installation de tous les modules nécessaires au fonctionnement de l'application.
- Installez Bootstrap : ``npm install vue bootstrap bootstrap-vue``
- 
*Lancez la commande ``npm run serve``


### BackEnd
*Accédez sur https://nodejs.org/en/ pour télécharger puis installer Node.js sur votre machine
*cd Backend:
Chargez le package nodemon : ``npm install -g nodemon``

Installer Express.js: ``npm install --save express``

pour le téléchargement de fichiers, installez le package Multer : ``npm install --save multer``

Lancez les commandes: ``npm i fs``, ``npm install body-parser``


## CONFIGURATION DE LA BASE DE DONNEES
### Dans le terminal du dossier backend

*Installez mysql2: ``npm install mysql2``

*Installer Sequelize et Sequelize CLI: ``npm install sequelize``, ``npm install --save sequelize-cli`` puis ``npx sequelize init``

=>Création des dossiers config, models et migrations.
Le dossier config contient le fichier de configuration, qui indique à sequelize comment se connecter à la base de données: 

"username": "Nom de L'utilisateur de la base de données MySQL",

"password": "mot de passe de l'utilisateur de la base de données MySQL",

"database": "nom de la base de données MySQL",

"host": "lien de la base de données MySQL",

"dialect": "mysql"

###Création de la base de donnée
Se connecter au serveur **MySql** de votre choix.
Exécuter la commande: CREATE DATABASE groupomania2;
Vérifiez les identifiants dans le fichier config.json du dossier Backend puis importer le fichier groupomania2.sql s'il vous a été fourni 


## DEMARRAGE

### FrontEnd
Ouvrir le dossier Frontend dans le terminal de votre éditeur puis exécuter la commande: 
 ``npm run serve``
 
 Le serveur est accessible en local sur le port 8081 :[http://localhost:8081/](http://localhost:8081/)


### BackEnd
Ouvrir le dossier Backend dans le terminal de votre éditeur puis exécuter la commande: 
``npm install`` puis ``npm run start``

## UTILISATION
**Pour s'inscrire sur le réseau d'entreprise de Groupomania renseigner:** 
* votre npm et prénom
* une adresse email valide
* un mot de passe (min 6 caractéres), 1 majuscule et 2 chiffres obligatoires, pas de symbole

**Aprés la connexion**
* vous pouvez changer la photo de profil
* supprimer votre compte
* voir tous les posts et les commenter
* poster des messages (avec image) et les supprimer
* un administrateur pourra supprimer votre compte, posts et commentaires.


