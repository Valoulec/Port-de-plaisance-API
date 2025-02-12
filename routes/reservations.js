/**
 * @file Routes pour la gestion des réservations
 * @module routes/reservationRoutes
 */

const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const auth = require('../middleware/auth');
/**
 * Route pour récupérer toutes les réservations
 * @name GET /
 * @function
 */
router.get('/', reservationController.getAllReservations);

/**
 * Route pour récupérer une réservation par son ID
 * @name GET /:id
 * @function
 */
router.get('/:id', reservationController.getReservationById);

/**
 * Route pour créer une réservation
 * @name POST /
 * @function
 */
router.post('/', auth, reservationController.createReservation);

/**
 * Route pour mettre à jour une réservation
 * @name PUT /:id
 * @function
 */
router.post('/update', reservationController.updateReservation);

/**
 * Route pour supprimer une réservation
 * @name POST /delete
 * @function
 */
router.post('/delete', auth, reservationController.deleteReservation);

module.exports = router;
