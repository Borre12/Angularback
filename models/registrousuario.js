const mongoose = require('mongoose')

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    correo: {
        type: String,
        require: true
    },
    telefono: {
        type: String,
        require: true
    },

    telefonomovil: {
        type: String,
        require: true
    },
    contrasena: {
        type: String,
        require: true
    },
    nombreusuario: {
        type: String,
        require: true
    },
    informacion: {
        type: String,
        require: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('registrousuario', UsuarioSchema)
