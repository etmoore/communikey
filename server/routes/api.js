const express = require('express');
const Ask = require('../db/models/Ask');

const router = express.Router();

router.get('/asks', (req, res, next) => {
  Ask.getAllAsks()
    .then(asks => res.json(asks))
    .catch(err => next(err));
});

// router.get('/asks/:id', (req, res, next) => {
//   const askID = parseInt(req.params.id, 10);
//   let ask = asks.filter(a => a.id === askID)[0];
//   res.json(ask);
// });

module.exports = router;
