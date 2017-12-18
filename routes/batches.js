const router = require('express').Router()
const { User } = require('../models')
const { Batch } = require('../models')
const passport = require('../config/auth')
const studentsRouter = require('./students')

router.use('/batches/:batchId', studentsRouter)

router.get('/batches', passport.authorize('jwt', { session: false }), (req, res, next) => {
  if (!req.account) {
    const error = new Error('Unauthorized')
    error.status = 401
    next(error)
  }
  Batch.find()
    .then((batches) => res.json(batches))
    .catch((error) => next(error))
})

router.post('/batches', passport.authorize('jwt', { session: false }), (req, res, next) => {
      let newBatch = req.body

      Batch.create(newBatch)
        .then((batch) => res.json(batch))
        .catch((error) => next(error))
})

module.exports = router
