/* middlware qui protégera les routes selectionnées et vérifier que
l'utilisateur est authentifier avant d'autoriser l'envoi des requetes*/
/* => vérifier si token valable  et si userId correspond bien*/

/***ETAPES**** *
  1.Importation de jsonwebtoken
  2. Vérification de la validité du token
     *auth du token dans l'entête des requêtes: 
        const token : recupére le token dans le req.headers.authorization
      *decodage du token
      *récupération du userId du token décodé
      *const { log } = require('console');
comparaison avec celui de la requete
*/
// package jwt//

const { log } = require('console');
const jwt = require('jsonwebtoken');
require("dotenv").config();


// /* extraction du token : 
//   vérifier si chaine de caractere
//   contient mot bearer */
const extractBearer = authorization => { 
    
    if(typeof authorization !== 'string'){
        return false
    }

    /*on isole le token : espace et insensible à la casse*/
    const matches = authorization.match(/(bearer)\s+(\S+)/i)
    return matches && matches [2] 
    /*matches 2 contient le token*/
}


// /* vérification de la présence du token */
    const authJwt = (req, res, next) => {

//     /*vérification attribut dans l'entete(bearer + chaine de caractére*/
    const token = req.headers.authorization && extractBearer (req.headers.authorization)
    console.log('HEADERS:', req.headers)
    console.log('TOKEN:',token)

    if(!token){
        return res.status(401).json({ message  : 'token non présent ou faux'})
    }

    /* vérifier la validité du token : delai et construction*/   
    jwt.verify(token, 'RANDOM_TOKEN_SECRET',(err, decodedToken) => {
        console.log('ERR TOKEN:',err)
        console.log('DECODED TOKEN:', decodedToken)
        if (err){
            return res.status(401).json({ message : 'token faux'})    
        }
        next()

    })   
}
module.exports = authJwt





//  module.exports = (req, res, next) => { // On exporte un middleware //
//    //tester si l'utilisateur est connecté  

//     try {
//         console.log(req.headers)       
//         const token = req.headers.authorization.split(' ')[1]; // [bear + N°]
//         // const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET', {expireIn:'24h'});
//         const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//         const userId = decodedToken.userId;
//         req.decodedToken = decotedToken
//         if (req.body.userId && req.body.userId !== userId) {          
//             throw error;
//         }
//         else{ 
//             //verifier que c'est bien l'utilisateur "local"
//             res.locals.idUser = userId
//             next();
//         }   

//         // si erreur si une des const =>renvoie catch
//     } catch (error) {
//         res.status(401).json({ error: new Error("requête non authentifiée!")});
//     }
//  }


    
        
