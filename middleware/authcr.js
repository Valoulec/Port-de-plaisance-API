const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded.user; // Ajoutez les infos utilisateur à req.user
      next();
    } catch (error) {
      console.error("Erreur de vérification du token:", error);
      return res.status(401).json({ message: "Token invalide" });
    }
  } else {
    return res.status(401).json({ message: "Token manquant" }); // ou res.redirect
  }
};
