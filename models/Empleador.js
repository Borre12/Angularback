const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const EmpleadorSchema = mongoose.Schema({
        NombreEmpresa: {
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
        sueldo: {
            type: String,
        },
        sitioweb: {
            type: String,
            require: true
        },
        ubicacion: {
            type: String,
            require: true
        },
        contrasena: {
            type: String,
            require: true
        },
    categoria: {
            type: String,
            require: true
    },
    titulo: {
            type: String,
            require: true
    },
    descripcion: {
            type: String,
            require: true
    },
    informacion: {
            type: String,
            require: true
    }
})

EmpleadorSchema.methods = {
    passwordvalidationEmp(contrasena){
        return bcrypt.compareSync(contrasena.replace(' ', ''), this.contrasena);
    }
}
EmpleadorSchema.pre('save', function (next){
    this.contrasena = bcrypt.hashSync(this.contrasena.replace(' ', ''), 10);
    next();
})
module.exports = mongoose.model('Empleador', EmpleadorSchema)

