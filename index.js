const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/vidly', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected successfully...'))
    .catch( (err) => console.error('Failed to connect to MongoDB: ', err.message))

const genres = require('./routes/genres');

app.use(express.json());
app.use('/api/genres', genres);


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening on port ${port}`));