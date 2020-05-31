const express = require('express');
let app = express();
let puerto = process.env.PORT || 3000;
app.get('/', function(req, resp) {
    res.status(200).send('<h1>Hola Mundo</h1>');
    res.end();
});
app.listen(puerto, function() { console.log('Server is Running') });