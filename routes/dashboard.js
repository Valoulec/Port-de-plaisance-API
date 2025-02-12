/**
 * @file Routes pour la gestion du tableau de bord
 * @module routes/dashboardRoutes
 */

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Reservation = require('../models/Reservation');
const Catway = require('../models/Catway');

/**
 * Route pour afficher le tableau de bord
 * @name GET /dashboard
 * @function
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 * @returns {void} Redirige vers la page d'accueil si non authentifié, sinon affiche le tableau de bord
 */
router.get('/', async (req, res) => {
    // Si l'utilisateur n'est pas connecté, redirige vers la page d'accueil (index.ejs)
    if (!req.session.userId) {
        return res.redirect('/');
    }

    // Si l'utilisateur est connecté, récupère les informations nécessaires
    const user = await User.findById(req.session.userId);
    const reservations = await Reservation.find();
    const catways = await Catway.find();
    const users = await User.find(); // Récupérer tous les utilisateurs

    // Assure-toi que ces variables existent même si elles sont nulles
    const message = req.session.message || "";
    const messageType = req.session.messageType || "";

    // Nettoyage après affichage
    req.session.message = null;
    req.session.messageType = null;

    res.render('dashboard', { user, reservations, catways, users, message, messageType });
});

/**
 * Route pour créer un catway depuis le tableau de bord
 * @name POST /catways/create
 * @function
 * @param {Object} req - Objet de requête Express contenant les données du catway
 * @param {Object} res - Objet de réponse Express
 * @returns {void} Redirige vers le tableau de bord avec un message de succès ou d'erreur
 */
router.post('/catways/create', async (req, res) => {
    try {
        const { catwayNumber, type, catwayState } = req.body;

        // Vérifier si un catway avec ce numéro existe déjà
        const existingCatway = await Catway.findOne({ catwayNumber });
        if (existingCatway) {
            req.session.message = "Ce catway existe déjà.";
            req.session.messageType = "error";
            return res.redirect('/dashboard');
        }

        // Créer un nouveau catway
        const newCatway = new Catway({ catwayNumber, type, catwayState });
        await newCatway.save();

        req.session.message = "Catway créé avec succès !";
        req.session.messageType = "success";
    } catch (error) {
        req.session.message = "Erreur lors de la création du catway.";
        req.session.messageType = "error";
    }

    res.redirect('/dashboard');
});

module.exports = router;
