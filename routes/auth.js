const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route pour afficher la page de connexion
router.get('/login', authController.login);

// Route pour gérer la soumission du formulaire de connexion
router.post('/login', authController.loginPost);

// Route pour l'inscription (si tu l'as)
router.post('/register', authController.register);

module.exports = router;
