const router = require('express').Router({mergeParams: true})
const { User } = require('../models')
const { Batch } = require('../models')
const passport = require('../config/auth')

router.post('/students', passport.authorize('jwt', { session: false }), (req, res, next) => {
  if (!req.account) {
    const error = new Error('Unauthorized')
    error.status = 401
    next(error)
  }
  let newStudent = req.body
  Batch.findById(req.params.batchId)
  .then((batch) => {
    batch.students.push(newStudent)
    return batch.save()
  })
  .then((batch) => res.json(newStudent))
  .catch((error) => next(error))
})

module.exports = router
