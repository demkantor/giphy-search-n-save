const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  console.log("in server /favorite/GET");
  const queryText = `SELECT * FROM favorites ORDER BY title ASC`;
  pool.query(queryText)
      .then( (result) => {
          res.send(result.rows);
      })
      .catch( (error) => {
          console.log(`Error on query ${error}`);
          res.sendStatus(500);
      });
});

// add a new favorite 
router.post('/', (req, res) => {
  console.log("in server post with: ", req.body);
  const newFavorite = req.body;
  const queryText = `INSERT INTO favorites ("title", "url", "category_id")
                    VALUES ($1, $2, $3)`;
  const queryValues = [
    newFavorite.sendTitle,
    newFavorite.sendUrl,
    newFavorite.sendCat
  ];
  pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error completing SELECT favorite query', err);
      res.sendStatus(500);
    });
});

// update given favorite with a category id ----------------can use this route to move favorites later
// router.put('/:favId', (req, res) => {
//   // req.body should contain a category_id to add to this favorite image
//   res.sendStatus(200);
// });

// delete a favorite
router.delete('/:id', (req, res) => {
  console.log("in server delete with: ", req.params.id);
  const queryText = "DELETE FROM favorites WHERE id=$1";
  pool.query(queryText, [req.params.id])
  .then(() => {
    res.sendStatus(200);
  }).catch(err => {
      console.log("Error deleting favorite", err);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  console.log('IN POST WITH:', req.body, req.params);
  const queryText = `UPDATE favorites SET "category_id" = $1 WHERE id=$2;`;
  const queryValues = Number(req.body.sendCat)
  pool.query(queryText, [queryValues, req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log("Error changing input category", err);
      res.sendStatus(500);
    });
})

module.exports = router;
