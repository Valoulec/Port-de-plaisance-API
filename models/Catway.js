/**
 * @file Model des catways
 * @module models/Catway
 */

const mongoose = require('mongoose');

/**
 * Schéma de données pour un catway
 * @typedef {Object} Catway
 * @property {number} catwayNumber - Numéro du catway
 * @property {string} type - Type de catway
 * @property {string} catwayState - État du catway
 */

const CatwaySchema = new mongoose.Schema({
    catwayNumber: { type: Number, required: true },
    type: { type: String, required: true },
    catwayState: { type: String, required: true }
});

module.exports = mongoose.model('Catway', CatwaySchema);
