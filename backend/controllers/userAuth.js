/* Fonctions :
Inscription nouveau utilisateur : signup
login utilisateur : login
Deconnexion : logout
Récupérer tous les utilisateurs: getAllUsers
Récupérer un utilisateur : getOneUser
Modifier  les infos d'un utilisateur: updateUserProfil
Suppression du profil : deleteUser



/********Import des modules necessaires*******/
const db = require("../models/index"); // modéle user
const bcrypt = require('bcrypt'); // hacher le MDP
const jwt = require("jsonwebtoken"); // token 
const fs = require("fs");

require("dotenv").config();
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

//****Inscription nouveau utilisateur + save ****//
module.exports.signup = (req, res, next) => { 
  // si les données n'existent pas       
  if (!req.body.firstName || !req.body.lastName ||!req.body.email || !req.body.password ){
    return res.status(400).json({ message : 'Données incomplètes' })
  } 
  if (!emailRegex.test(req.body.email)) {    
    return res.status(400).json({message: 'Email non valide' })       
  }
  // trouver un utilisateur par email pour vérification   
    db.User.findOne({where: { email: req.body.email }})     
      .then(user => {
        //Vérification si un utilisateur corresponde déjà à l'email de la DB//
        if (user!== null) {
          return res.status(409).json({message :"utilisateur déja existant"})
        }
               
         // hashage MDP et 10 tour de salage 
         bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND))
          .then (hash => {  
            // création du nouvel user            
            db.User.create ({                
              firstName : req.body.firstName,
              lastName : req.body.lastName,        
              email: req.body.email,
              password : hash,
              isAdmin : 0,            
            })
            .then((user) => res.status(201).json({message:"compte crée", user}))                         
            .catch(error => {console.log(error)
              res.status(400).json ({message: 'compte non crée!'})
            })              
          }) 
          .catch(error => res.status(500).json ({message: 'erreur de hashage',}))
      })        
      
      .catch(error =>{
        console.log(error);
          res.status(500).json ({message : "erreur de la base de donnée "})
      }) 
}

//****login utilisateur ****//
exports.login = (req, res, next) => {
   // validation des données recues : email et password
    if (!req.body.email || !req.body.password ){
      return res.status(400).json({ message : ' mauvais email ou mot de passe' })
    }    

    // récupérer les données de l'utilisateur
    db.User.findOne ({ where: {email : req.body.email}})
    // récupére l'email de la requete (input)
    .then(user => {
      // on vérifie que mail est dans la BDD
      if(user == null){
        return res.status(401).json({message: 'utilisateur inconnu'});       
      } 
      //MDP : comparer le MDP avec bcrypt:
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if(!valid){
            return res.status(401).json ({message : 'mot de passe incorect !'});
          } 
            // generation du token : JWT.sign({payload}), secret, durée//
            const token = jwt.sign(
            { userId: user.id,             
            }, 'RANDOM_TOKEN_SECRET',               
            {expiresIn: '24h'}
            )  
            console.log(token)
                // si ok renvoi le token  
                res.status(200).json({
                userId : user.id,
                email : user.email,
                isAdmin : user.isAdmin,
                token    
                })                       
        })           
        
        .catch(error => {console.log(error)
          res.status(500).json({ message: "connexion impossible" })})
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json ({message : "erreur de la base de donnée "})})     
};

//****Deconnexion ****//
exports.logout = (req, res,) => {     
console.log(req.body);
  // remove the req.user property and clear the login session
  req.logout();
  // destroy session data
  req.session = null;
  // redirect to homepage
  res.redirect('/login/auth');
  res.status(200).json({message: "utilisateur deconnecté"});
}
 

// ****récupérer tous les utilisateurs****/
exports.getAllUsers = (req, res, next) => {
   console.log("bonjour tous les utilisateurs")
    db.User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'imageUrl', 'isAdmin']
    })
      .then(users => res.status(200).json({users}))       
      .catch(error =>{
        console.log(error);
          res.status(500).json ({message : "erreur de la base de donnée "})
      }) 
};


// *****récupération d'un utilisateur : GET ****/
exports.getOneUser = (req, res, next) => { 
  let userId = parseInt(req.params.id)
  // Vérification si le champ id est présent et cohérent : si pas de userId
  if(!userId){
    return res.json(400).json({message : "paramétre manquant"})
  }
  db.User.findOne({ 
    where: { id: req.params.id }})  
      .then(user =>{
        if((user === null)){
          return res.status(404).json({message: "l'utilisateur n'existe pas!" })
        }
          // utilisateur existe
          return res.status(200).json({ user })
      })    
      .catch(error => {console.log(error);
        res.status(500).json({message: "erreur de la base de donnée" })
      });
}     
                
// *******modifier  les infos d'un utilisateur : profil par ex : PUT
exports.updateUserProfil = (req, res, next) => {  
  const userObject = req.file?{          
    ...req.body.user,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`            
    } : { 
    ...req.body }
  console.log(userObject)

  db.User.findOne({ 
    where: { id: req.params.id,},  
  })  
  db.User.update({
   ...userObject
  }, {where: { id: req.params.id }
  })

  .then(() => res.status(200).json({ postObject }))
  .catch(error => res.status(400).json({ error})) 
} 
                      
/*** suppression du profil ***/
exports.deleteUser = (req, res, next) => {    
  console.log("suppression compte user")
  //  const User = db.User
    db.User.findOne({ where: {id: req.params.id}})
    .then((user) => {      
      // on supprime le compte utilisateur  : fonction destroy
        db.User.destroy({where: { id: req.params.id }})
          .then (()=> res.status(200).json({ message: "Profil supprimé"}))
          .catch(error =>{
          console.log(error);
            res.status(400).json({message: "utilisateur non trouvé" })
          });                  
                  
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({error})
    });   
}

   
        

    







