// require necessary NPM packages
const express = require('express')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:7165',
    methods: ["GET", "POST"]
  }
})
const mongoose = require('mongoose')
const cors = require('cors')

// require route files
const messageRoutes = require('./app/routes/message_routes')
const userRoutes = require('./app/routes/user_routes')

// require middleware
const errorHandler = require('./lib/error_handler')
const replaceToken = require('./lib/replace_token')
const requestLogger = require('./lib/request_logger')

// require database configuration logic
// `db` will be the actual Mongo URI as a string
const db = require('./config/db')

// require configured passport authentication middleware
const auth = require('./lib/auth')

// define server and client ports
// used for cors and local port declaration
const serverDevPort = 3000
const clientDevPort = 7165

// establish database connection
// use new version of URL parser
// use createIndex instead of deprecated ensureIndex
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true
})

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}` }))

// define port for API to run on
const port = process.env.PORT || serverDevPort

// this middleware makes it so the client can use the Rails convention
// of `Authorization: Token token=<token>` OR the Express convention of
// `Authorization: Bearer <token>`
app.use(replaceToken)

// register passport authentication middleware
app.use(auth)

// add `express.json` middleware which will parse JSON requests into
// JS objects before they reach the route files.
// The method `.use` sets up middleware for the Express application
app.use(express.json())
// this parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({ extended: true }))

// log each request as it comes in for debugging
app.use(requestLogger)

// register route files
app.use(messageRoutes)
app.use(userRoutes)

// register error handling middleware
// note that this comes after the route middlewares, because it needs to be
// passed any error messages from them
app.use(errorHandler)

// run API on designated port (4741 in this case)
// app.listen(port, () => {
//   console.log('listening on port ' + port)
// })


http.listen(3000, () => {
  console.log('listening')
})
const userArr = []
io.on('connection', (socket) => {
  // is loading when the browser opens, not on sign in.
  socket.emit('newConnection', 'Welcome')
  
  socket.on('username', email => {
    userArr.push(email)
    socket.emit('email', userArr)
    socket.emit(email)
    email = ''
  })

  console.log(socket.client.id, 'entered')
  socket.broadcast.emit('newConnection', 'A new user has joined')
  socket.on('sendMessage', ((message) => {
    messageArr.push(message)
    console.log(messageArr)
    // should this be io.emit or socket.emit?
    socket.broadcast.emit('message', message)

    socket.on('disconnectUser', () => {
      console.log('user')
    })

    socket.on('disconnect', () => {
      console.log('user left')
      // let index = userArr.findIndex(email)
      // userArr.splice(index)
      io.emit('disconnected')
      console.log('user left')
    })
}))})

// needed for testing
module.exports = app
