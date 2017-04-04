const express = require('express');
const Ask = require('../db/models/Ask');

const router = express.Router();

router.get('/asks', (req, res, next) => {
  Ask.getAllAsks()
    .then(asks => res.json(asks))
    .catch(err => next(err));
});

router.get('/asks/:id', (req, res, next) => {
  Ask.getAsk(req.params.id)
    .then(ask => res.json(ask))
    .catch(err => next(err));
});

router.post('/asks', (req, res, next) => {
  Ask.createAsk(req.body)
    .then(askID => Ask.getAsk(askID))
    .then(ask => res.json(ask))
    .catch(err => next(err));
});

module.exports = router;
