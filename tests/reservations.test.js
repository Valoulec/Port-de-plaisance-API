const assert = require('assert');
const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');

let testReservations = []; // Stocke les ID des réservations de test

before(async function () {
    // Connexion à la base de données MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/port-de-plaisance', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

after(async function () {
    // Fermeture de la connexion MongoDB après les tests
    await mongoose.disconnect();
});

afterEach(async function () {
    // Supprime uniquement les réservations créées durant les tests
    if (testReservations.length > 0) {
        await Reservation.deleteMany({ _id: { $in: testReservations } });
        testReservations = []; // Réinitialise la liste après suppression
    }
});

describe('Tests du modèle Reservation avec MongoDB', function () {
    it('Devrait créer une nouvelle réservation', async function () {
        const reservation = new Reservation({
            catwayNumber: 1,
            clientName: "Thomas Martin",
            boatName: "Carolina",
            checkIn: new Date("2022-05-21T06:00:00Z"),
            checkOut: new Date("2022-12-27T06:00:00Z")
        });
    
        await reservation.save();
        testReservations.push(reservation._id); // Ajoute à la liste des tests
    
        // Vérifier que SEULEMENT cette réservation existe dans la base
        const reservations = await Reservation.find({ _id: reservation._id });
        assert.strictEqual(reservations.length, 1, `Erreur: trouvé ${reservations.length} réservations au lieu de 1`);
        assert.strictEqual(reservations[0].boatName, "Carolina");
    });
    

    it('Devrait récupérer une réservation spécifique', async function () {
        const reservation = new Reservation({
            catwayNumber: 2,
            clientName: "Alice Dupont",
            boatName: "Blue Wave",
            checkIn: new Date("2023-06-10T06:00:00Z"),
            checkOut: new Date("2023-07-15T06:00:00Z")
        });
        await reservation.save();
        testReservations.push(reservation._id); // Ajoute l'ID à la liste des tests

        const foundReservation = await Reservation.findOne({ clientName: "Alice Dupont" });
        assert(foundReservation, "Aucune réservation trouvée !");
        assert.strictEqual(foundReservation.boatName, "Blue Wave");
    });

    it('Devrait mettre à jour une réservation', async function () {
        const reservation = new Reservation({
            catwayNumber: 3,
            clientName: "Jean Durand",
            boatName: "Sea Breeze",
            checkIn: new Date("2024-01-01T06:00:00Z"),
            checkOut: new Date("2024-02-01T06:00:00Z")
        });
        await reservation.save();
        testReservations.push(reservation._id); // Ajoute l'ID à la liste des tests

        await Reservation.updateOne({ _id: reservation._id }, { boatName: "Ocean Spirit" });

        const updatedReservation = await Reservation.findOne({ _id: reservation._id });
        assert.strictEqual(updatedReservation.boatName, "Ocean Spirit");
    });

    it('Devrait supprimer une réservation', async function () {
        const reservation = new Reservation({
            catwayNumber: 4,
            clientName: "Paul Lambert",
            boatName: "Wave Rider",
            checkIn: new Date("2025-03-10T06:00:00Z"),
            checkOut: new Date("2025-04-10T06:00:00Z")
        });
        await reservation.save();
        testReservations.push(reservation._id); // Ajoute l'ID à la liste des tests

        await Reservation.deleteOne({ _id: reservation._id });

        const deletedReservation = await Reservation.findOne({ _id: reservation._id });
        assert.strictEqual(deletedReservation, null);
    });
});
