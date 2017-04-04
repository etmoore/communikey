const express = require('express');

const asks = require('../asks');
const router = express.Router();

router.get('/asks', (req, res, next) => {
  res.json(asks);
});

router.get('/asks/:id', (req, res, next) => {
  const askID = parseInt(req.params.id, 10);
  let ask = asks.filter(a => a.id === askID)[0];
  res.json(ask);
});

module.exports = router;
