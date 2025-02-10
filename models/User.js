/**
 * @file Models des catways, réservations et utilisateurs
 * @module models
 */

const mongoose = require('mongoose');

/**
 * Schéma de données pour un utilisateur
 * @typedef {Object} User
 * @property {string} email - Adresse e-mail de l'utilisateur
 * @property {string} password - Mot de passe de l'utilisateur
 * @property {string} [name] - Nom de l'utilisateur (optionnel)
 */

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: false } // Champ optionnel
});

module.exports = mongoose.model('User', userSchema);
