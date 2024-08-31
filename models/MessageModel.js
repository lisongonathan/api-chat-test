const db = require('../config/db');

// Fonction pour insérer un message
const insertMessage = (message, userId, callback) => {
  const sql = 'INSERT INTO message (message, user_id) VALUES (?, ?)';
  db.query(sql, [message, userId], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion du message :', err);
      return callback(err, null);
    }
    console.log('Message inséré avec succès, ID :', result.insertId);
    callback(null, result.insertId);
  });
};

// Fonction pour récupérer tous les messages
const getMessages = (callback) => {
  const sql = 'SELECT * FROM messages';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des messages :', err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = { insertMessage, getMessages };
