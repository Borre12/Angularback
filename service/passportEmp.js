const passportemp = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Emp = require('../models/Empleador')

passportemp.use('login', new LocalStrategy({usernameField: 'correo', passwordField: 'contrasena'},(correo, contrasena, done) => {
    Emp.findOne({'correo': correo})
        .then((emp)=>{
            if (!emp){
                console.log('usuario no encontrado')
                return done(null, false, {message: 'correo no encontrado'})
            }else if (!emp.passwordvalidationEmp(contrasena)){
                console.log('Wrong pass');
                return done(null, false, {message: 'Passsword invalida'})
            }
            console.log('Good pass');
            return done(null, emp);
        })
        .catch(err => {
            console.log(err);
            return done(err);
        });
}));
passportemp.serializeUser((user, done) => {
    done(null, user._id);
})
passportemp.deserializeUser((id,done ) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
});

passportemp.use('register', new  LocalStrategy({passReqToCallback: true, usernameField: 'correo', passwordField: 'contrasena'},  function(req, correo, contrasena, done){
    console.log(' si entra')
    Emp.findOne({'correo': correo})
        .then((emp) => {
            console.log(emp)
            if (emp){
                return done(null, false, {message:'Empleador ya registrado'})
                console.log("correo registrado ya")
            }else{
                console.log('entro a mapear al usuario')
                const nuevoEmpleador = new Emp();
                nuevoEmpleador.NombreEmpresa = req.body.NombreEmpresa;
                nuevoEmpleador.correo = correo;
                nuevoEmpleador.telefono = req.body.telefono;
                nuevoEmpleador.sueldo = req.body.sueldo;
                nuevoEmpleador.sitioweb = req.body.sitioweb;
                nuevoEmpleador.ubicacion = req.body.ubicacion;
                nuevoEmpleador.contrasena = contrasena;
                nuevoEmpleador.categoria = req.body.categoria;
                nuevoEmpleador.titulo = req.body.titulo;
                nuevoEmpleador. descripcion = req.body.descripcion;
                nuevoEmpleador.informacion = req.body.informacion;
                nuevoEmpleador.save(function(err){
                    if(!err){
                        console.log('entro a registrar nuevo usuario')
                        console.log(nuevoEmpleador)
                        return done(null,  nuevoEmpleador);

                    }else{
                        return done(err);
                        console.log(err);
                    }
                });
            }
        })
        .catch(err => done(err));
}));

module.exports = passportemp;
