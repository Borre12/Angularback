const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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

UsuarioSchema.pre('save', function (next){
    bcrypt.genSalt(10).then(salts => {
        bcrypt.hash(this.contrasena, salts).then(hash => {
            this.contrasena = hash;
            next();
        }).catch(error => next(error))
    }).catch(error => next(error))
});

//Metodo para comparar contrasenas
/*
UsuarioSchema.methods.compararClave =  function (contrasena, cb){
    bcrypt.compare(contrasena, this.password, function (err, resultado){
        if (err){
            return cb(err)
        }
        cb(null, resultado)
    })
}

 */

module.exports = mongoose.model('registrousuario', UsuarioSchema)
