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
// route when area is selected
router.get('/area/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    connection.query('SELECT name from restaurants WHERE id_area = ?', id, (err, results) => {
        res.json(results)
    })
})
module.exports = router;