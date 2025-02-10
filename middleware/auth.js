/**
 * @file Middleware d'authentification avec JWT
 * @module middlewares/auth
 */

const jwt = require('jsonwebtoken');

/**
 * Middleware pour vérifier le token JWT d'authentification
 * @function
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 * @param {Function} next - Fonction pour passer au middleware suivant
 * @returns {Object|void} Renvoie une erreur JSON en cas d'échec ou passe à la requête suivante si le token est valide
 */
module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Invalid token.' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

