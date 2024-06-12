require('dotenv').config()
const express = require('express')
const app = express()
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport-config')
const isLoggedIn = require('./middleware/isLoggedIn')
const { User, Product, Category } = require('./models')

// Environment variables
const SECRET_SESSION = process.env.SECRET_SESSION;
const PORT = process.env.PORT || 3000

// Middleware setup
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))
app.use(session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: true
}))
app.use(flash())

// Initialize passport
app.use(passport.initialize())
app.use(passport.session())

// Middleware for tracking users and alerts
app.use((req, res, next) => {
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next(); //going to said route
})

// Home route
app.get('/', (req, res) => {
    res.render('home', {})
})

// Import auth routes
app.use('/auth', require('./controllers/auth'))

// Import other routes
app.use('/users', require('./controllers/user'))
app.use('/products', require('./controllers/product'))
app.use('/categories', require('./controllers/category'))

// Authenticated route: user profile page
app.get('/profile', isLoggedIn, (req, res) => {
    const { name, email, phone } = req.user
    res.render('profile', { name, email, phone })
})

// Start the server
const server = app.listen(PORT, () => {
    console.log('You are listening on PORT ', PORT)
})

module.exports = server;
