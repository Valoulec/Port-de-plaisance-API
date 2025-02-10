/**
 * @file Contrôleur pour la gestion des réservations
 * @module controllers/Reservation
 */

const Reservation = require('../models/Reservation');
const mongoose = require('mongoose');

/**
 * Récupère toutes les réservations et les affiche sur la page des réservations
 * @async
 * @function getAllReservations
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.render('reservations', { reservations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Récupère une réservation par son ID et l'affiche sur la page correspondante
 * @async
 * @function getReservationById
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.render('reservation', { reservation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Crée une nouvelle réservation et redirige vers la liste des réservations
 * @async
 * @function createReservation
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.createReservation = async (req, res) => {
    try {
        const newReservation = new Reservation(req.body);
        await newReservation.save();
        res.redirect('/reservations');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Met à jour une réservation existante et redirige vers la liste des réservations
 * @async
 * @function updateReservation
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.updateReservation = async (req, res) => {
    try {
        const { reservationId, checkIn, checkOut } = req.body;

        // Vérifier si l'ID est valide
        if (!mongoose.Types.ObjectId.isValid(reservationId)) {
            return res.status(400).json({ message: 'ID de réservation invalide' });
        }

        // Mise à jour de la réservation
        const updatedReservation = await Reservation.findByIdAndUpdate(
            reservationId,
            { checkIn, checkOut },
            { new: true } // Retourne la réservation mise à jour
        );

        if (!updatedReservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }

        res.redirect('/reservations');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Supprime une réservation en fonction de son ID et redirige vers la liste des réservations
 * @async
 * @function deleteReservation
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.deleteReservation = async (req, res) => {
    try {
        const { reservationId } = req.body;

        // Convertir reservationId en ObjectId
        if (!mongoose.Types.ObjectId.isValid(reservationId)) {
            return res.status(400).json({ message: 'ID de réservation invalide' });
        }

        const deletedReservation = await Reservation.findByIdAndDelete(reservationId);
        if (!deletedReservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }

        res.redirect('/reservations');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


