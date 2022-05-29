/*middleware qui va configurer multer pour lui expliquer comment gérer les fichiers
 entrant, ou les enregistrer et quel nom leur donner*/

 /*importer multer*/
const multer = require ('multer');

/*définir le format des images*/
const MIME_TYPES = {
    'file/jpg': 'jpg',
    'file/jpeg': 'jpg',
    'file/png': 'png',
    'file/gif': 'gif', 
    'file/bmp': 'bmp', 
    'file/gif': 'gif',  
    'file/webp': 'webp',
    
};

/*definir ou enregistrer les fichiers entrants  sur le disque (diskstorage)*/
const storage = multer.diskStorage({
    /*ou les enregister*/
    destination : (req, file, callback) => {
        /*nom du dossier*/
        callback(null,'images');
    },
    /*comment les nommer*/
    filename : (req, file, callback) => {
        /* nom origine, on supprime les espaces que l'on remplace par _*/
        const name = file.originalname.split('').join('_');
        /*On utilise le format definit par les mimetype */
        const extension = MIME_TYPES[file.mimetype];
        /* nom du fichier global : nom + date + .extension*/
        /* calleback avec argument null  : pas d'erreur*/
        callback (null, name + Date.now() + '.'+ extension);
    }
});
/*exporter multer avec objet storage et fichier unique (single)*/
module.exports = multer ({storage : storage}).single('file');