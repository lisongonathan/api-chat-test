const MessageModel = require('../models/MessageModel');

// Contrôleur pour gérer les messages
const addMessage = (req, res) => {
  const { message, userId } = req.body;
  MessageModel.insertMessage(message, userId, (err, messageId) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de l\'ajout du message' });
    }
    res.status(201).json({ messageId });
  });
};

const getMessages = (req, res) => {
  MessageModel.getMessages((err, messages) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
    }
    res.status(200).json(messages);
  });
};

module.exports = { addMessage, getMessages };
