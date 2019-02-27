const connection = require('./conf');

const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
  const idArea = req.query.id_area
  const rating = req.query.rating
  const first_category = req.query.first_category
  const second_category = req.query.second_category
  
  let idAreaSql = ``
  let ratingSql = ``
  let first_categorySql = ``
  let second_categorySql = ``

  if (idArea) {
    idAreaSql = `AND id_area = ${idArea}`
  }
  if (rating) {
    ratingSql = `AND editorialRating = ${rating}`
  }
  if (first_category) {
    first_categorySql = `AND primaryCategory = '${first_category}'`
  }
  if (second_category) {
    second_categorySql = `AND secondaryCategory = '${second_category}'`
  }

  connection.query(
      `SELECT * FROM restaurants WHERE 1=1 ${idAreaSql} ${ratingSql} ${first_categorySql} ${second_categorySql}`, (err, results) => {
        if (err) {
          res.status(500).json({error: 'Erreur lors du chargement'});
        } else {
          if (results.length === 0) {
            res.json({message: 'Aucun résultat pour cette recherche'})
          }
          else {
            res.status(200).json(results)
          }
        }
      }
    )
  
  

})
module.exports = router;