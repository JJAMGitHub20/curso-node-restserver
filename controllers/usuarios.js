const { response, request } = require('express');
const bcriptjs = require('bcryptjs');


const Usuario = require('../models/usuario');

const usuariosGet = async(req, res = response) => {
    //De esta forma toma todo lo que esta en el query
    //const query = req.query;
    //Para tomar solo algunos campos
    //const { q, nombre = "No name", apikey } = req.query;

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    /* const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite));

    const total = await Usuario.countDocuments(query);
 */

    // Esta solución es más eficiente, consume menos recursos.
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {


    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcriptjs.genSaltSync();
    usuario.password = bcriptjs.hashSync(password, salt);

    // Guardar en la base de datos
    await usuario.save();

    // Se puede deestructurar para leer solo la información necesaria
    //const { Nombre, Edad } = req.body;

    res.json({
        msg: 'get API - usuariosPost',
        usuario
        //body //Muestra lo que contiene el body
        //Nombre,
        //Edad
    });
}

const usuariosPut = async(req, res = response) => {
    //Los parametros que llegan por Put se pueden tomar de la siguente forma
    //const id = req.params.id;
    //Cuando son varios se pueden deestructurar
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra la base de datos
    if (password) {
        // Encriptar la contraseña
        const salt = bcriptjs.genSaltSync();
        resto.password = bcriptjs.hashSync(password, salt);
    }

    //const usuario = await Usuario.findByIdAndUpdate(id, resto);
    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'get API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    //Borrado físico
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(usuario);
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}