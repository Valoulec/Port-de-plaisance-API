const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Fonction pour afficher la page de connexion
exports.login = (req, res) => {
    res.render('index');  // Affiche la page de connexion
};

exports.loginPost = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Recherche l'utilisateur dans la base de données par son email
        const user = await User.findOne({ email });

        // Vérifie si l'utilisateur existe
        if (!user) {
            req.session.message = 'Utilisateur non trouvé';
            req.session.messageType = 'error';
            return res.redirect('/');  // Redirige vers la page de connexion
        }

        // Vérifie si le mot de passe correspond
        if (user.password !== password) {
            req.session.message = 'Mot de passe incorrect';
            req.session.messageType = 'error';
            return res.redirect('/');  // Redirige vers la page de connexion
        }

        // Stocke l'utilisateur dans la session (pour la gestion de la session)
        req.session.userId = user._id;
        req.session.userName = user.name;

        // Génération du token JWT
        const token = jwt.sign(
            { userId: user._id },  // Données à inclure dans le token
            process.env.JWT_SECRET,  // Clé secrète
            { expiresIn: '1h' }  // Durée d'expiration du token
        );

        // Envoie le token au client (par exemple dans les cookies ou l'en-tête)
        res.cookie('token', token, { httpOnly: true });  // Le token est stocké dans un cookie sécurisé (httpOnly)

        // Redirige vers le tableau de bord
        res.redirect('/dashboard');

    } catch (error) {
        console.error(error);
        req.session.message = 'Erreur de connexion';
        req.session.messageType = 'error';
        res.redirect('/');  // Redirige vers la page de connexion
    }
};

// Fonction pour gérer l'inscription (si nécessaire)
exports.register = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.session.message = 'Cet utilisateur existe déjà';
            req.session.messageType = 'error';
            return res.redirect('/');  // Redirige vers la page de connexion
        }

        // Crée un nouvel utilisateur
        const newUser = new User({ email, password, name });
        await newUser.save();

        req.session.message = 'Inscription réussie !';
        req.session.messageType = 'success';
        res.redirect('/');  // Redirige vers la page de connexion
    } catch (error) {
        console.error(error);
        req.session.message = 'Erreur lors de l\'inscription';
        req.session.messageType = 'error';
        res.redirect('/');  // Redirige vers la page de connexion
    }
};

