const { response } = require("express")


const validaArchivoSubir = (req, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg: 'No hay archivos que subir - validaArchivoSubir'
        });
    }

    next();

}

module.exports = {
    validaArchivoSubir
}