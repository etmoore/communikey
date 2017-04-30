const express = require('express')
const Ask = require('../db/models/Ask')
const authHelpers = require('../helpers/auth')

const router = express.Router()

router.get('/', (req, res, next) => {
  Ask.getAllAsks()
    .then(asks => res.json(asks))
    .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
  Ask.getAsk(req.params.id)
    .then(ask => res.json(ask))
    .catch(err => next(err))
})

router.post('/', (req, res, next) => {
  Ask.createAsk(req.body)
    .then(askID => Ask.getAsk(askID))
    .then(ask => res.json(ask))
    .catch(err => next(err))
})

router.put('/:id', (req, res, next) => {
  Ask.updateAsk(req.params.id, req.body)
    .then(id => Ask.getAsk(id))
    .then(updatedJob => res.json(updatedJob))
    .catch(err => next(err))
})

router.delete('/:id', authHelpers.protect, (req, res, next) => {
  Ask.deleteAsk(req.params.id)
    .then(() => res.json({ status: 'success' }))
    .catch(err => next(err))
})

module.exports = router
