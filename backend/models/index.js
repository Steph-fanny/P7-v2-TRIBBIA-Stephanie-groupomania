'use strict';
const dotenv = require("dotenv");
dotenv.config({path:"./.env"});
const Sequelize = require('sequelize');



const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME, 
  process.env.DB_PASS, 
  {
  host: process.env.DB_HOST,
  port : process.env.DB_PORT,
  dialect: 'mysql'
});
console.log(sequelize)

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require ("./user")(sequelize, Sequelize),
db.Post = require ("./post")(sequelize, Sequelize),
db.Comment = require ("./comment")(sequelize, Sequelize),

db.Comment.belongsTo(db.User);
db.User.hasMany(db.Comment);


db.Comment.belongsTo(db.Post);
db.Post.hasMany(db.Comment);

db.Post.belongsTo(db.User);
db.User.hasMany(db.Post);



sequelize.authenticate()
  .then(() => console.log('Connexion à mysql réussie !'))
  .catch(error => console.log('Connexion échouée:' + error))

module.exports = db;