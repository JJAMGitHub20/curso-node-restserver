const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El Rol ${ rol } no está registrado en la Base de Datos`)
    }
}

const emailExiste = async(correo = '') => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async(id) => {
    // Verificar si el Id existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El Id: ${ id }, no existe`);
    }
}

/**
 * Categorias 
 */

const existeCategoriaPorId = async(id) => {
    // Verificar si el Id existe
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El Id: ${ id }, no existe`);
    }
}

/**
 * Productos 
 */

const existeProductoPorId = async(id) => {
    // Verificar si el Id existe
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El Id: ${ id }, no existe`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}