const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validaArchivoSubir } = require('../middlewares');
const { cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary,
    } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

router.post('/', validaArchivoSubir, cargarArchivo);
router.put('/:coleccion/:id', [
    validaArchivoSubir,
    check('id', 'el Id debe ser de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary);
//], actualizarImagen);


router.get('/:coleccion/:id', [
    check('id', 'el Id debe ser de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen )

module.exports = router;