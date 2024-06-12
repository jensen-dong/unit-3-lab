const mongoose = require('mongoose');
const User = require('./user');
const Product = require('./product');

mongoose.connect(process.env.MONGO_URI_PROD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

module.exports = { User, Product };
