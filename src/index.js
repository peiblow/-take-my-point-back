const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const app = express()
const server = require('http').Server(app)

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MONGO DB'))
.catch(err => console.log(err))

app.use(cors())

app.use(express.json())
app.use(require('./routes'))

server.listen(process.env.PORT || 3001, () => {
  console.log('Server is running now!')
})
module.exports = app