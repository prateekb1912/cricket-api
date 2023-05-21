require('dotenv').config()

const express = require('express');
const { connectToDB, getDB } = require('./db');

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.use('/api/players/', require('./routes/players'))

app.listen(PORT, () => console.log(`Listening for requests on http://localhost:${PORT}`));