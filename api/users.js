const connection = require('./conf');

const express = require('express');

const router = express.Router();

// user sign up
router.post('/', (req, res) => {
    const { lastname, firstname, email, password } = req.body
    connection.query('INSERT INTO users VALUES (null, ?, ?, ?, ?)', [lastname, firstname, email, password], (err, result) => {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.status(200).json({message: 'user created'});
        }
    })
})

// user sign in
router.post('/login', (req, res) => {
    const {email, password} = req.body
    connection.query('SELECT * FROM users WHERE email = ?', email, (err, result) => {
        if (err) {
            res.status(500).json(err);
        }
        else {
            if (result.length !== 0) {
                if (password === result[0].password) {
                    res.status(200).json(result)
                }
                else {
                    res.status(400).json({message: 'wrong password'})
                }
            }
            else {
                res.status(400).json({message: 'user not found'});
            }
        }
        
    })
})

// get user favorites by passing the id user
router.get('/:id', (req, res) => {
    const { id } = req.params
    connection.query('SELECT * FROM favorites INNER JOIN restaurants ON favorites.restaurant_id = restaurants.id WHERE user_id = ?', id, (err, result) => {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.status(200).json(result);
        }
    })
})

// post in the favorites table a user restaurant favorites
router.post('/favorites', (req, res) => {
    const {id_restaurant, id_user} = req.body
    connection.query('SELECT * FROM favorites WHERE restaurant_id = ? AND user_id = ?', [id_restaurant, id_user], (err, result) => {
        if (err) {
            res.status(500).json(err);
        }
        else {
            if (result.length === 0) {
                connection.query('INSERT INTO favorites VALUES (null, ?, ?)', [id_restaurant, id_user], (err, result) => {
                    if (err) {
                        res.status(500).json(err);
                    }
                    else {
                        res.status(200).json({message: 'favorites created'})
                    }
                })
            }
            else {
                res.status(400).json({message: 'favorites already created'});
                console.log(res)
            }
        }
    })
    
})

// delete a favorites
router.delete('/favorites/:id_user/:id_restaurant', (req, res) => {
    const {id_restaurant, id_user} = req.params
    connection.query('DELETE FROM favorites WHERE restaurant_id = ? AND user_id = ?', [id_restaurant, id_user], (err, result) => {
        if(err) {
            res.status(500).json(err);
        }
        else {
            res.status(200).json({message: 'favorites deleted'})
        }
    })
})

module.exports = router;