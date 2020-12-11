const MongoClient = require('mongodb').MongoClient;
const config = require('./config').config;
const logger = require('./logger').log;

exports.dao = {
    read: (query, collection, res) => {
        logger.info(query);
        try {
            MongoClient.connect(config.db.url, (err, db) => {
                if (err) {
                    logger.error(err);
                    throw err;
                };
                let dbo = db.db(config.db.dbName);

                let daoPromise = () => {
                    return new Promise((resolve, reject) => {
                        dbo.collection(collection)
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
    },
    write: (query, collection, res) => {
        logger.info(query);
        try {
            MongoClient.connect(config.db.url, (err, db) => {
                if (err) {
                    logger.error(err);
                    throw err;
                };
                let dbo = db.db(config.db.dbName);

                let daoPromise = () => {
                    return new Promise((resolve, reject) => {
                        dbo.collection(collection).insert(query, (err, data) => {
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