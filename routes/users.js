/**
 * @file Routes pour la gestion des utilisateurs
 * @module routes/userRoutes
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
/**
 * Route pour créer un utilisateur
 * @name POST /
 * @function
 */
router.post('/', auth, userController.createUser);

/**
 * Route pour récupérer la liste des utilisateurs
 * @name GET /liste
 * @function
 */
router.get('/liste', userController.getuserlist);

/**
 * Route pour mettre à jour un utilisateur
 * @name POST /update
 * @function
 */
router.post('/update', userController.updateUser);

/**
 * Route pour supprimer un utilisateur
 * @name POST /:id
 * @function
 */
router.post('/:id', auth, userController.deleteUser);

/**
 * Route pour récupérer un utilisateur par son ID
 * @name GET /:id
 * @function
 */
router.get('/:id', userController.getUserById);

/**
 * Route pour afficher le formulaire de création d'un utilisateur
 * @name GET /new
 * @function
 */
router.get('/new', (req, res) => res.render('createUser'));

module.exports = router;
