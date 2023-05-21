const express = require('express');
const { connectToDB, getDB } = require('../db');

let db;

connectToDB((err) => {
    if (!err) db = getDB();
    else console.log(err);
})


const router = express.Router();

router.get('/', (req, res) => {
    const page = req.query.page || 0;
    const perPage = 10;

    let players = [];

    db.collection('players')
        .find()
        .sort({ matches_played: -1 }) // Returns a cursor pointing to a subset of the collection data
        .skip(page*perPage)
        .limit(perPage)
        .forEach(plyr => players.push(plyr))
        .then(() => {
            res.status(200).json({"page": page, players})
        })
        .catch(() => {
            res.status(500).json({ 'error': 'Internal Server Error' })
        })
})

router.post('/', (req, res) => {
    const newPlayer = req.body;

    if(!newPlayer.name || !newPlayer.team)
        res.status(400).json({'error': 'Please include name and team'})
    
    db.collection('players')
    .insertOne(newPlayer)
    .then(result => res.status(result))
    .catch(err => res.status(500).json({'error': 'Internal Server Error', 'message': err}))
})

module.exports = router;