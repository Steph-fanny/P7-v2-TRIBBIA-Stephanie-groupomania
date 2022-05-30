/*importer les modeles et package */
// package fs : telechargement et suppression d'images//
const fs = require ('fs');
const db = require("../models/index");
const User = db.User;
const Post= db.Post;
const Comment = db.Comment;

//vérifier nombre de caractere 
const CONTENT_LIMIT = 4;

// ****Création d'un post**** //
exports.createPost = (req, res, next) => {
  // récupérer les paramétres envoyés dans la requete 
  const postObjet = { 
      UserId: req.body.userId,                
      content: req.body.content,
  }
  console.log(postObjet)
  // vérification: si 1 des paramétre obligatoire est null   
  if (req.body.content == null){
    return res.status(400).json({message: 'le contenu ne peut pas être vide'});
  } 
  if (req.body.content.lenght<= CONTENT_LIMIT){
    return res.status(400).json({message: 'le contenu doit etre plus eleve'});
  } 
  // enregistrement dans bdd : si présence d'un fichier ou non
  if (req.file) {
    Post.create({ 
      ...postObjet,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename }`,
  })
    .then(() => res.status(201).json({message: 'post créé !'}))
    .catch((error) => res.status(400).json({message: 'Vous ne pouvez pas publier un post'}))
  } else {

    Post.create({
    ...postObjet,
    imageUrl: null,
    })
    .then(() => res.status(201).json({ message: 'post créé !'}))
    .catch((error) => res.status(400).json({message: 'Vous ne pouvez pas publier un post'}))
    }
}
   
         
/**** afficher tous les posts et les commentaires liés *****/
exports.getAllPost = (req, res, next) => {  
  Post.findAll({   
    include: Comment,
    attributes:["id", "UserId", "content", "imageUrl",]   
  })
    .then(posts => res.status(200).json({ posts}))       
    .catch(error =>{
      console.log(error);
      res.status(400).json ({error})
      })           
 };

//*****Afficher un post  : get****//
exports.getOnePost = (req, res, next) =>{
  Post.findOne({
    attributes:["UserId", "content", "imageUrl",],
    where: { id: req.params.id },
  })    
  .then(post => res.status(200).json({ post }))
  .catch(error => res.status(404).json({error}))
}

  
// **** supprimer un post  et les commentaires qui sont liés****/
exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id }})  
  
  Post.destroy({ where: { id: req.params.id } })                  
    .then(() => res.status(201).json("post supprime"))
    .catch (error => res.status(400).json({error}))
        
}


//**** modifier un post ****/
exports.modifyPost = (req, res, next) =>{
  Post.findOne({ 
    where: { id: req.params.id,},  
    include: db.User
    }) 

    const postObject = req.file ? {
      ...req.body.post,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
      ...req.body
    };

  Post.update({
    ...postObject
  }, {where: { id: req.params.id }
     })
    .then(() => res.status(200).json({ postObject }))
    .catch(error => res.status(400).json({ error})) 
} 

 
 


                   





