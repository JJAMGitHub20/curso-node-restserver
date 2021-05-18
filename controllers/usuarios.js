const { response, request } = require('express');

const usuariosGet = (req, res = response) => {
    //De esta forma toma todo lo que esta en el query
    //const query = req.query;
    //Para tomar solo algunos campos
    const { q, nombre = "No name", apikey } = req.query;

    res.json({
        msg: 'get API - controlodador',
        //query
        q,
        nombre,
        apikey
    });
}

const usuariosPost = (req, res = response) => {

    //const body = req.body; toma todo lo del Body
    // Se puede deestructurar para leer solo la información necesaria
    //const { Nombre, Edad } = req.body;

    res.json({
        msg: 'get API - usuariosPost',
        //body Muestra lo que contiene el body
        //Nombre,
        //Edad
    });
}

const usuariosPut = (req, res = response) => {
    //Los parametros que llegan por Put se pueden tomar de la siguente forma
    //const id = req.params.id;
    //Cuando son varios se pueden deestructurar
    const { id } = req.params;

    res.json({
        msg: 'get API - usuariosPut',
        id
    });
}

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'get API - usuariosPatch'
    });
}

const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'get API - usuariosDelete'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}