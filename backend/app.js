/*Configuration: 
  1 : importation : 
      - importation express : construction API rest
      - body-parser :analyser la requête et à créer : req.bodyobjet
      - cors fournit un middleware Express pour activer CORS avec diverses options

  2 : BDD
  3 : initialisation de l'app express  et autre methode : app.use 
  4 : sécurité : CORE, helmet, cookies
  5 : bodyparser
  6 : routes
  7 : exportation de l'app */

const express = require("express");
const app =  express();
const bodyParser = require('body-parser')
const path = require(`path`); // donne accés systéme de fichier images
const helmet = require('helmet'); // sécuriser les entêtes
const cors = require("cors");

//importer les routes à l'application : user, route post et comment
const userRoutes = require('./routes/user');
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

// const { sequelize } = require('./models/index');
const db = require("./models/index");
// creation de la BDD si elle n'existe pas
db.sequelize.sync()
// db.sequelize.sync({ force: true });

 app.use(cors());

//********************************sécurité ***********/
  // 1 er middleware exécuté par le server  : appliqué à toutes les réquetes
  //application accéde à l'api en sécurité
  //configuration des en-têtes CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*" );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


// bodyparser : transformation du corps de la requete en objet js  : toutes les routes de l'appli
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gérer la ressource image de maniere statique//
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.json());

// route pour le frontend :chemin + nom router : lorsque reconcontre api/user=> routes 

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use('/api/comment',commentRoutes); 

// //protection des en-têtes HTTP grâce à Helmet
app.use(helmet());

//exporter l'appli depuis les autres fichiers
module.exports = app;


