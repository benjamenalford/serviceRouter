// config
//TODO - load from external files and only show methods here
exports.config = {
    appName: "serviceRouter",
    db: {
        name: 'mongo',
        url: 'mongodb://192.168.1.10:27017',
        dbName: 'ephemera',
        collectionName: "logger"
    },
    apis: {
        //TODO make up mind
    },
    http: {
        port: 2021
    },
    debug: false
}