const MongoClient = require('mongodb').MongoClient;
const config = require('./config').config;
const logger = require('./logger').log;

exports.dao = {
    write: function(d) {
        console.log("write " + d + config.db.collectionName + config.db.url);
        MongoClient.connect(config.db.url, function(err, db) {
            if (err) {
                logger.error(err);
                throw err;
            };
            var dbo = db.db(config.db.dbName);
            var query = {};
            dbo.collection(config.db.collectionName).insert(d, (err, d) => {
                if (err) {
                    logger.error(err);
                    throw err;
                }
            });
        });
    },
    read: function(query) {
        console.log("read " + query);
        var response;
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

            });

            // dbo.collection(config.db.collectionName).find().toArray().then(function(err, data) {
            //     err ?
            //         reject(err) :
            //         resolve(data);
            // });

        });
        return response;
    }
}