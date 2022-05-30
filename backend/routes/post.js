/*importer : 
1.express (pour le router) 
2.appeler le router avec la méthode express 
3.middleware pour autorisation jwt 
4. middlecare pour authentification admin
5.middleware multer pour la gestion des fichiers entrants
6.controller pour crud POSTS*/

  const express = require('express')
  const router = express.Router()   
  const multer = require("../middleware/multer"); 
  const postCtrl = require("../controllers/post");
  const authJwt = require ("../middleware/authJwt");
 

  /*** créer un nouveau post (et sauvegarder) ***/
  router.post("/new",authJwt,multer, postCtrl.createPost);

  /*** afficher tous les posts ***/
  router.get("/",authJwt,postCtrl.getAllPost);

  /*** afficher un post ***/
  router.get ("/:id",authJwt, postCtrl.getOnePost);

  // *** modifier un post ***
  router.put("/:id",authJwt, multer, postCtrl.modifyPost);

  /*** supprimer un post  : admin ***/
  router.delete ("/:id",authJwt, multer, postCtrl.deletePost);

  // /**aimer un post **/
  // router.post = ("/:id/like", auth, postCtrl.likePost);

  module.exports = router;