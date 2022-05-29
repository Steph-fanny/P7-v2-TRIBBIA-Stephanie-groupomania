// Require : importer le package http
const http = require("http");
// importer l'application
const app = require("./app");
// importer variable environnement
require('dotenv').config();


//fonction normalizePort : renvoie un port valide, forme n° ou chaine
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
// indiquer sur quel port va tourner express//
/**process.env.Port = (config/.env) **/
const port = normalizePort(process.env.PORT||'3000' );
app.set("port", port);

//fonction errorHandler : recherche les erreurs
const errorHandler = (error) => {
if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// créer un server : fonction qui sera appelé à chaque requête recu par le server
const server = http.createServer(app);


// ecouteur d'événement : port ou canal nommé pour execution server
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind =typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});
server.listen(port);


