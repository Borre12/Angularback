const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Usuarios');
const Emp = require('../models/Empleador')

//Passport implementado para el login
passport.use('login', new LocalStrategy({usernameField: 'nombreusuario', passwordField: 'contrasena'},(nombreusuario, contrasena, done) => {
    User.findOne({'nombreusuario': nombreusuario})
        .then((user)=>{
            if (!user){
                console.log('usuario no encontrado')
                return done(null, false, {message: 'Usuario no encontrado'})
            }else if (!user.passwordvalidation(contrasena)){
                console.log('Wrong pass');
                return done(null, false, {message: 'Passsword invalida'})
            }
            console.log('Good pass');
            return done(null, user);
        })
        .catch(err => {
            console.log(err);
            return done(err);
        });
}));
passport.serializeUser((user, done) => {
    done(null, user._id);
})
passport.deserializeUser((id,done ) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
});

// Passport implementado para el registro del usuario
passport.use('register', new  LocalStrategy({passReqToCallback: true, usernameField: 'nombreusuario', passwordField: 'contrasena'},  function(req, nombreusuario, contrasena, done){
    console.log(' si entra')
    User.findOne({'nombreusuario': nombreusuario})
        .then((user) => {
            console.log(user)
            if (user){
                return done(null, false, {message:'Usuario ya registrado'})
            }else{
                console.log('entro a mapear al usuario')
                  const nuevoUsuario = new User();
                     nuevoUsuario.nombre = req.body.nombre;
                     nuevoUsuario.fechaNac = req.body.fechaNac;
                     nuevoUsuario.correo = req.body.correo;
                     nuevoUsuario.telefono = req.body.telefono;
                     nuevoUsuario.telefonomovil = req.body.telefonomovil;
                     nuevoUsuario.contrasena = contrasena;
                     nuevoUsuario.nombreusuario = nombreusuario;
                     nuevoUsuario.genero = req.body.genero;
                     nuevoUsuario.informacion = req.body.informacion;
                     nuevoUsuario. estudios = req.body.estudios;
                 nuevoUsuario.save(function(err){
                    if(!err){
                        console.log('entro a registrar nuevo usuario')
                        console.log(nuevoUsuario)
                        return done(null,  nuevoUsuario);

                    }else{
                        return done(err);
                        console.log(err);
                    }
                });
            }
        })
        .catch(err => done(err));
}));

//Empleador
passport.use('login', new LocalStrategy({usernameField: 'correo', passwordField: 'contrasena'},(correo, contrasena, done) => {
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
passport.serializeUser((user, done) => {
    done(null, user._id);
})
passport.deserializeUser((id,done ) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
});

passport.use('register', new  LocalStrategy({passReqToCallback: true, usernameField: 'correo', passwordField: 'contrasena'},  function(req, correo, contrasena, done){
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


module.exports = passport;
