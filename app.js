const express = require('express')
const bodyParser = require('body-parser');
const config = require('./config').config;
const logger = require('./logger').log;
const dao = require('./dao').dao;
const app = express()
const port = config.http;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.engine('.html', whiskers.__express);

//Read all of a collection
app.get('/api/:collection/', (req, res) => {
    Object.entries(req.params).forEach(([k, v]) => logger.info(`${k} : ${v}`))
    let collection = req.params.collection;
    dao.read({}, collection, res)
});

//read an id of a collection
app.get('/api/:collection/id/:id', (req, res) => {
    Object.entries(req.params).forEach(([k, v]) => logger.info(`${k} : ${v}`))
    let collection = req.params.collection;
    let query = req.params.id;
    dao.read({ "id": parseInt(query) }, collection, res)
});

// post json data to a collection
app.post('/api/:collection/', (req, res) => {
    Object.entries(req.params).forEach(([k, v]) => logger.info(`${k} : ${v}`))
    let collection = req.params.collection;
    logger.info(req.body)
    dao.write(req.body, collection, res);
})

app.listen(port, () => {
    logger.info(`server loaded at ${port.port}`);
    logger.info("started");
})