const express = require('express');
const { connectToDB, getDB } = require('./db');
const { ObjectId } = require('mongodb');

const PORT = process.env.PORT || 5000;

const app = express();

let db;

connectToDB((err) => {
    if(!err) {
        app.listen(PORT, () => console.log(`Listening for requests on http://localhost:${PORT}`));
        db = getDB();
    }
})

app.use(express.json());
app.use('/api/players/', require('./routes/players'))