const { MongoClient } = require('mongodb');

let dbConnection;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

module.exports = {
    connectToDB: (cb) => {
        MongoClient.connect(DB_CONNECTION_STRING)
            .then(client => {
                    dbConnection = client.db()
                    return cb()
                })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },  // establish connection to Mongo Database on localhost

    getDB: () => dbConnection,
}