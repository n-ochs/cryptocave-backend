const mongodb = require('mongodb');
require('dotenv').config();

const MongoClient = mongodb.MongoClient;
const mongoDbUrl = process.env.MONGO_CONNECTION;

let _db;

const initDb = () => {
    const callback = (param1, param2) => {
        return (param1, param2);
    };
    
    if (_db) {
        console.log('Database is already initialized');
        return callback(null, _db);
    };
    MongoClient.connect(mongoDbUrl, { useUnifiedTopology: true })
        .then(client => {
            _db = client;
            callback(null, _db);
        })
        .catch(err => {
            callback(err)
        });
};

const getDb = () => {
    if(!_db) {
        throw Error('Database not initialized');
    };

    return _db;
};

module.exports = {
    initDb,
    getDb
};