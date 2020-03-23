require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const error = require('./middleware/error');
const winston = require('./config/winston');
const morgan = require('morgan');
const Joi  = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');

process.on('unhandledRejection', (ex) => {
    throw ex;
});

if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

const app = express();

mongoose.connect('mongodb://localhost/vidly', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => winston.info('MongoDB connected successfully.'))
    .catch( (err) => winston.error('Failed to connect to MongoDB: ', err));

app.use(morgan('combined', {stream: winston.stream}));
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening on port ${port}`));