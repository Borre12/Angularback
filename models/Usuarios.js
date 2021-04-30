const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    fechaNac: {
        type: String,
        require: true
    },
    correo: {
        type: String,
        require: true,
    },
    telefono: {
        type: String,
        require: true
    },

    telefonomovil: {
        type: String,
        require: true
    },
    contrasena : {
        type: String,
        require: true
    },
    nombreusuario: {
        type: String,
        require: true,
    },
    genero: {
        type: String,
        require: true,
    },
    informacion: {
        type: String,
        require: true
    },
    estudios: {
        type: String,
        require: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
})

UsuarioSchema.methods = {
    passwordvalidation(contrasena){
        return bcrypt.compareSync(contrasena.replace(' ', ''), this.contrasena);
    }
}
UsuarioSchema.pre('save', function (next){
    this.contrasena = bcrypt.hashSync(this.contrasena.replace(' ', ''), 10);
    next();
})
module.exports = mongoose.model('Usuarios', UsuarioSchema)
