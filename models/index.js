const mongoose = require('mongoose')
require('dotenv').config()
console.log('--PRINT--', process.env.MONGO_URI_PROD)

// import models
const User = require('./user')
mongoose.connect(process.env.MONGO_URI_PROD)

const db = mongoose.connection

db.once('open', () => console.log(`Connected to MongoDB at ${db.host}:${db.port}`))
db.on('error', (error) => console.log('Database error \n', error))

module.exports = {
    User,
}