/**
 * @file Models des catways et réservations
 * @module models
 */
const mongoose = require('mongoose');
/**
 * Schéma de données pour une réservation
 * @typedef {Object} Reservation
 * @property {number} catwayNumber - Numéro du catway associé
 * @property {string} clientName - Nom du client
 * @property {string} boatName - Nom du bateau
 * @property {Date} checkIn - Date d'arrivée
 * @property {Date} checkOut - Date de départ
 */

const ReservationSchema = new mongoose.Schema({
    catwayNumber: { type: Number, required: true },
    clientName: { type: String, required: true },
    boatName: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
