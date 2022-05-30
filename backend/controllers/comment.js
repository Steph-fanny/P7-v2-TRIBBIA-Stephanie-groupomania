/*importer les modeles */
const db = require("../models/index");
const User = db.User;
const Comment = db.Comment;
const Post = db.Post;
const fs = require('fs');
const CONTENT_LIMIT = 2;


/**** creation d'un commentaire */
exports.addComment = (req, res, next) => {
    console.log(req.body)
    // récupérer les paramétres envoyés dans la requete
    const comment = {                    
        PostId: req.body.postId,       
        content: req.body.content,
        UserId: req.body.userId,   
    }
        console.log(comment)
     // vérification: si 1 des paramétre obligatoire est null   
    if (req.body.content == null){
      return res.status(400).json({message: 'le contenu ne peut pas être vide'});
    } 
    if (req.body.content.lenght<= CONTENT_LIMIT){
       return res.status(401).json({message: 'le contenu doit etre plus eleve'});
    } 

    // enregistrement dans bdd
    Comment.create({            
        PostId: req.body.postId,                 
        content:req.body.content,
        UserId: req.body.userId,
        createAt: 0
   })
    .then(() => res.status(201).json({ message: "Message envoyé!" }))
    .catch(error => res.status(400).json({message: 'Vous ne pouvez pas publier un commentaire' }))
}  
           
// /*** afficher tous les commentaires ***/
exports.getAllComment = (req, res, next) => {
    Comment.findAll()
        .then((comments) => res.status(200).json(comments))
        .catch(error => {console.log(error);
                res.status(400).json ({error})
        })
};

   
// /*** afficher un commentaire ***/
exports.getOneComment = (req, res, next) => {
    Comment.findOne({ 
        where: { id: req.params.id },
        attributes:["id","postId", "content","userId"]  
     })
        .then((comment) => res.status(200).json({comment}))
        .catch(error => {console.log(error);
                res.status(400).json ({error})
            })
};
   
// // ***supprimer un commentaire
exports.deleteComment  = (req, res, next) => { 
    Comment.findOne({
        where: {Id: req.params.id },             
    })              
    Comment.destroy({ where: { id: req.params.id } }) 
            .then(() => res.status(200).json({ message: 'commentaire supprimée' }))
            .catch (error => res.status(400).json({error}))
               
}      
   









