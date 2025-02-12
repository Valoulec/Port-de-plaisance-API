/**
 * @file Contrôleur des utilisateurs
 * @module controllers/userController
 */

const User = require('../models/User');

/**
 * Création d'un utilisateur
 * @async
 * @function createUser
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.session.message = 'Email déjà utilisé';
            req.session.messageType = 'error';
            return res.redirect('/dashboard');
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        req.session.message = 'Utilisateur créé avec succès';
        req.session.messageType = 'success';
        res.redirect('/dashboard');
    } catch (error) {
        req.session.message = 'Erreur serveur, veuillez réessayer.';
        req.session.messageType = 'error';
        res.redirect('/dashboard');
    }
};

/**
 * Mise à jour d'un utilisateur
 * @async
 * @function updateUser
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.updateUser = async (req, res) => {
    try {
        const { userId, name, email } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "ID utilisateur manquant" });
        }
        let updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Suppression d'un utilisateur
 * @async
 * @function deleteUser
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Récupération d'un utilisateur par son ID
 * @async
 * @function getUserById
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Récupération de la liste des utilisateurs
 * @async
 * @function getuserlist
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.getuserlist = async (req, res) => {
    try {
        const users = await User.find();
        res.render('users', { users });
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
