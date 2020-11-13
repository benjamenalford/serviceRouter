const MongoClient = require('mongodb').MongoClient;
let config = require('./config').config;

exports.dao = {

    write: function(d) {
        console.log("write" + d);
        MongoClient.connect(config.db[0].url, function(err, db) {
            if (err) {
                log.error(err);
                throw err;
            };
            var dbo = db.db(config.db.dbName);
            var query = {};
            dbo.collection(config.db.collectionName).find(query).toArray(function(err, result) {
                if (err) throw err;
                console.log(result.length)
                db.close();
            });
        });
    },
    read: function(query) {
        console.log("write" + query);
        MongoClient.connect(config.db[0].url, function(err, db) {
            if (err) {
                log.error(err);
                throw err;
            };
            var dbo = db.db(config.db.dbName);
            query = {};
            dbo.collection(config.db[0].collectionName).find(query).toArray(function(err, result) {
                if (err) throw err;
                console.log(result.length)
                db.close();
            });
        });
    }
};