/**
 * @file Routes pour l'authentification des utilisateurs
 * @module routes/authRoutes
 */

const express = require('express');
const router = express.Router();
const User = require('../models/User');

/**
 * Route pour la connexion de l'utilisateur
 * @name POST /login
 * @function
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 * @returns {Object} Redirige vers le tableau de bord ou renvoie une erreur JSON
 */
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || user.password !== req.body.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        req.session.userId = user._id;
        res.redirect('/dashboard');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * Route pour la déconnexion de l'utilisateur
 * @name POST /logout
 * @function
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 * @returns {void} Détruit la session et redirige vers la page d'accueil
 */
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
