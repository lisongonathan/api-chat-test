// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const MessageController = require('./controllers/MessageController');

// Utiliser la variable d'environnement pour le port
const port = process.env.PORT || 8000;

// Middleware pour analyser le corps des requêtes JSON
app.use(bodyParser.json());

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
  // Routes API pour les messages
  app.post('/messages', MessageController.addMessage);
  app.get('/messages', MessageController.getMessages);
  
  // Gérer les connexions WebSocket
  io.on('connection', (socket) => {
    console.log('Client connected');
  
    // Envoyer tous les messages lors de la connexion initiale
    MessageController.getMessages(null, (err, messages) => {
      if (!err) {
        socket.emit('initialMessages', messages);
      }
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected now');
    });
  
    socket.on('message', (msg) => {
      MessageController.addMessage({ body: msg }, {
        status: (code) => ({ json: (response) => io.emit('message', msg) }),
      });
    });
  });
  
  // Démarrer le serveur
  http.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });