const MongoClient = require('mongodb').MongoClient;
const config = require('./config').config;
const logger = require('./logger').log;

exports.dao = {
    write: function(d) {
        console.log("write " + d + config.db.collectionName);
        MongoClient.connect(config.db.url, function(err, db) {
            if (err) {
                logger.error(err);
                throw err;
            };
            var dbo = db.db(config.db.dbName);
            var query = {};
            dbo.collection(config.db.collectionName).insert(d).toArray(function(err, result) {
                if (err) {
                    logger.error(err);
                    throw err;
                }
                console.log(result.length)
                db.close();
            });
        });
    },
    read: function(query) {
        console.log("read " + query);
        MongoClient.connect(config.db.url, function(err, db) {
            if (err) {
                logger.error(err);
                throw err;
            };
            var dbo = db.db(config.db.dbName);
            query = {};
            dbo.collection(config.db.collectionName).find(query).toArray(function(err, result) {
                if (err) {
                    logger.error(err);
                    throw err;
                }

                db.close();
                return result;
            });
        });
    }
};