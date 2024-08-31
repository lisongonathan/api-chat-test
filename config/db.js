// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config();

const mysql = require('mysql2');

// Configuration de la connexion à la base de données MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connecter à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit(1); // Arrête l'application en cas d'erreur
  }
  console.log('Connecté à la base de données MySQL.');
});

module.exports = db;
