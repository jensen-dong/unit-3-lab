require('dotenv').config()
const express = require('express')
const app = express()
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport-config')
const isLoggedIn = require('./middleware/isLoggedIn')
const { User } = require('./models')

// import models

const SECRET_SESSION = process.env.SECRET_SESSION;
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))
app.use(session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: true
}))
app.use(flash())

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

//middleware for tracking users and alerts
app.use((req, res, next) => {
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next(); //going to said route
})

app.get('/', (req,res) => {
    res.render('home', {})
})

app.use('/', require('./controllers/products.js'))

// import auth routes below
app.use('/auth', require('./controllers/auth'))



// --- AUTHENTICATED ROUTE user profile page ---
app.get('/profile', isLoggedIn, (req, res) => {
    const { name, email, phone} = req.user
    res.render('profile', { name, email, phone })
})

// POST ROUTES
// --- grab data from req.body + create user + redirect + error handling
// --- name, email, phone, password


const server = app.listen(PORT, () => {
    console.log('You are listening on PORT ', PORT)
})

module.exports = server;