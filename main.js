const express = require('express');
var bodyParser = require('body-parser')
let app = express();

let puerto = process.env.PORT || 3000;

let Usuarios = [];
let Recargas = [];

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//Rutas Get
app.get('/GetUsuarios', function(req, resp) {

    resp.status(200).json(Usuarios);
    resp.end();

});
app.get('/GetAllRecargas', function(req, resp) {
    resp.status(200).json(Recargas);
    resp.end();
});

app.get('/GetRecargas', function(req, resp) {
    let idBuscado = req.body.idUsuario;
    console.log(idBuscado + ': Parameter');
    let validacion = false;
    Recargas.forEach(element => {
        if (element.idUsuario == idBuscado) {
            validacion = true;
        }
    });

    if (validacion) {

        resp.status(200).send(Recargas);

    } else {
        resp.status(400).json({ mensaje: 'No existen recargas para este Id' });
    }
    resp.end();
});


//Rutas Post
app.post('/InsertUsuario', function(req, resp) {
    let newUsuario = {
        id: req.body.id,
        nombre: req.body.nombre,
        pcr: req.body.pcr
    };
    Usuarios.push(newUsuario);
    resp.status(200).json({ mensaje: 'Se inserto Usuario' });
    resp.end();
});



app.post('/InsertRecarga', function(req, resp) {
    let newRecarga = {
        idRecarga: Recargas.length + 1,
        idUsuario: req.body.idUsuario,
        monto: req.body.monto,
        numero: req.body.numero,
        pcr: req.body.pcr
    };
    Recargas.push(newRecarga);
    resp.status(200).json({ mensaje: 'Se inserto Recarga' });
    resp.end();
});



app.listen(puerto, function() { console.log('Server is Running') });