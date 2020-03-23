const mongoose = require('mongoose');
const winston = require('./logging');

module.exports = function () {
    mongoose.connect('mongodb://localhost/vidly', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => winston.info('MongoDB connected successfully.'))
};