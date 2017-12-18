const express = require('express')
const passport = require('./config/auth')
const { Batch } = require('./models')
const cors = require('cors')
const bodyParser = require('body-parser')
const { batches, users, sessions } = require('./routes')

const PORT = process.env.PORT || 3000

const app = express();
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(passport.initialize())

  .use(users)
  .use(batches)
  .use(sessions)


app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    // only print full errors in development
    error: app.get('env') === 'development' ? err : {}
  })
})


app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
