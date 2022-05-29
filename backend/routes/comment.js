/*importer : 
1.express (pour le router) 
2.appeler le router avec la méthode express 
3.middleware pour autorisation jwt 
4.controller pour crud comment*/
 
const express = require('express')
const router = express.Router()
const authJwt = require("../middleware/authJwt");
// const authAdmin = require("../middleware/authUserAdmin");
const commentCtrl = require("../controllers/comment")

    
  /*** créer un nouveau commentaire ***/ 
  router.post("/new", authJwt, commentCtrl.addComment);

  /*** afficher un commentaire ***/
  router.get("/:id", authJwt, commentCtrl.getOneComment);

  /*** afficher tous les commentaire ***/
  router.get("/", authJwt, commentCtrl.getAllComment);
  
  //  /*** modifier un commentaire ***/
  // router.put("/:id",commentCtrl.updateComment);

   // *** supprimer un commentaire posté ***
  router.delete("/:id",  authJwt,commentCtrl.deleteComment);

 module.exports = router;

