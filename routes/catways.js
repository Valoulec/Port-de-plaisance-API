/**
 * @file Routes pour la gestion des catways
 * @module routes/catwayRoutes
 */

const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');
const auth = require('../middleware/auth');
/**
 * Route pour récupérer tous les catways
 * @name GET /
 * @function
 */
router.get('/', catwayController.getCatways);

/**
 * Route pour afficher le formulaire d'ajout d'un catway
 * @name GET /get-add
 * @function
 */
router.get('/get-add', catwayController.getAddCatway);

/**
 * Route pour créer un catway
 * @name POST /
 * @function
 */
router.post('/', auth, catwayController.createCatway);

/**
 * Route pour récupérer un catway par son ID
 * @name GET /:id
 * @function
 */
router.get('/:id', catwayController.getOneCatway);

/**
 * Route pour afficher le formulaire de modification d'un catway
 * @name GET /get-edit/:id
 * @function
 */
router.get('/get-edit/:id', catwayController.getEditCatway);

/**
 * Route pour remplacer un catway
 * @name PUT /:id
 * @function
 */
router.put('/:id', catwayController.replaceCatway);

/**
 * Route pour mettre à jour l'état d'un catway
 * @name POST /update
 * @function
 */
router.post('/update', catwayController.updateCatway);

/**
 * Route pour supprimer un catway
 * @name POST /delete
 * @function
 */
router.post('/delete', auth, catwayController.deleteCatway);

module.exports = router;

