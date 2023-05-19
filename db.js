const { MongoClient } = require('mongodb');

let dbConnection;

const DB_CONNECTION_PATH = process.env.DB_CONNECTION_PATH

module.exports = {
    connectToDB: (cb) => {
        MongoClient.connect(DB_CONNECTION_PATH)
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