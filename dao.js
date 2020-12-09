const MongoClient = require('mongodb').MongoClient;
const config = require('./config').config;
const logger = require('./logger').log;

exports.dao = {
    write: (d) => {
        console.log(`write ${d}${config.db.collectionName}${config.db.url}`);
        MongoClient.connect(config.db.url, function(err, db) {
            if (err) {
                logger.error(err);
                throw err;
            };
            var dbo = db.db(config.db.dbName);
            dbo.collection(config.db.collectionName).insert(d, (err, d) => {
                if (err) {
                    logger.error(err);
                    throw err;
                }
            });
        });
    },
    read: (query, res) => {
        try {
            MongoClient.connect(config.db.url, (err, db) => {
                if (err) {
                    logger.error(err);
                    throw err;
                };
                let dbo = db.db(config.db.dbName);

                let daoPromise = () => {
                    return new Promise((resolve, reject) => {
                        db(config.db.dbName).collection(config.db.collectionName)
                            .find(query)
                            .toArray(function(err, data) {
                                err ? reject(err) : resolve(data);
                            });
                    });
                };

                let callDaoPromise = async() => {
                    return await (daoPromise());
                };

                callDaoPromise().then(function(result) {
                    dbo.close();
                    res.json(result);
                });
            });
        } catch (err) {
            logger.error(err);
            next(err);
        }
    }
}