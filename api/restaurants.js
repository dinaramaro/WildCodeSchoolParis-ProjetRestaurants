const connection = require('./conf');

const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
    connection.query('SELECT * from restaurants', (err, results) => {
        if(err) {
            res.status(500).send('Erreur lors du chargement');
        }
        else {
            res.json(results)
        }
    })
})
router.get('/test', (req, res) => {
    connection.query('SELECT name from restaurants', (err, results) => {
        res.json(results)
    })
})
module.exports = router;