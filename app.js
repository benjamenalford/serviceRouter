const express = require('express')
const bodyParser = require('body-parser');
const config = require('./config').config;
const logger = require('./logger').log;
const dao = require('./dao');
const app = express()
const port = config.http;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.engine('.html', whiskers.__express);

app.get('/api/', (req, res) => {
    res.send([{ "id": 1 }]);
})

app.post('/api/', (req, res) => {
    //console.log('Got body:', req.body);
    //console.log(req.body["results"][0]["id"])
    res.sendStatus(200);
})
app.listen(port, () => {
    console.log(`server loaded at ${port}`);
    logger.info("started");
    dao.dao.write({ id: 1 });
    var x = dao.dao.read("test");
    console.log(x)
})