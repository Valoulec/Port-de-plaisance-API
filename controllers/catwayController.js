/**
 * @file Contrôleur pour la gestion des catways
 * @module controllers/Catway
 */

const Catway = require('../models/Catway');

/**
 * Récupère tous les catways et les affiche sur la page des catways
 * @async
 * @function getCatways
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.getCatways = async (req, res) => {
    try {
        const catways = await Catway.find();
        res.render('catways', { catways });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Affiche le formulaire pour ajouter un catway
 * @function getAddCatway
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.getAddCatway = (req, res) => {
    res.render('addCatway');
};

/**
 * Crée un nouveau catway et redirige vers le tableau de bord
 * @async
 * @function createCatway
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.createCatway = async (req, res) => {
    try {
        const newCatway = new Catway(req.body);
        await newCatway.save();
        return res.redirect('/dashboard');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Récupère un catway par son ID et l'affiche sur la page correspondante
 * @async
 * @function getOneCatway
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.getOneCatway = async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        if (!catway) {
            return res.status(404).send("Catway non trouvé");
        }
        res.render('catway', { catway });
    } catch (error) {
        console.error("Erreur serveur :", error.message);
        res.status(500).send('Erreur serveur');
    }
};

/**
 * Affiche le formulaire pour modifier un catway
 * @async
 * @function getEditCatway
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.getEditCatway = async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        if (!catway) {
            return res.status(404).json({ message: 'Catway not found' });
        }
        res.render('editCatway', { catway });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Met à jour un catway existant et redirige vers le tableau de bord
 * @async
 * @function updateCatway
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.updateCatway = async (req, res) => {
    try {
        const { catwayId, catwayState } = req.body;

        if (!catwayId || !catwayState) {
            return res.status(400).send("Données manquantes");
        }

        const updatedCatway = await Catway.findByIdAndUpdate(
            catwayId, 
            { catwayState }, 
            { new: true }
        );

        if (!updatedCatway) {
            return res.status(404).send('Catway introuvable');
        }

        res.redirect('/dashboard');
    } catch (error) {
        console.error("Erreur serveur :", error.message);
        res.status(500).send('Erreur serveur : ' + error.message);
    }
};

/**
 * Supprime un catway en fonction de son ID et redirige vers le tableau de bord
 * @async
 * @function deleteCatway
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.deleteCatway = async (req, res) => {
    try {
        const { catwayId } = req.body;
        const deletedCatway = await Catway.findByIdAndDelete(catwayId);
        if (!deletedCatway) {
            return res.status(404).json({ message: 'Catway not found' });
        }
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Remplace complètement un catway existant par de nouvelles données
 * @async
 * @function replaceCatway
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.replaceCatway = async (req, res) => {
    try {
        const replacedCatway = await Catway.findOneAndReplace(
            { _id: req.params.id },
            req.body,
            { new: true, overwrite: true }
        );
        if (!replacedCatway) {
            return res.status(404).json({ message: 'Catway not found' });
        }
        res.json({ message: 'Catway replaced successfully', replacedCatway });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
