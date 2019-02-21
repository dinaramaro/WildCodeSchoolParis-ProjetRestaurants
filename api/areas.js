const connection = require('./conf');

const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM areas', (err, areas) => {
        if(err) {
            res.status(500).send('Erreur lors du chargement');
        }
        else {
            res.status(200).json(areas)
        }
    })
    
})

module.exports = router;