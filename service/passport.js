const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/registrousuario');

passport.use('/login', new LocalStrategy({usernameField: 'nombreusuario', passwordField: 'contrasena'},(nombreusuario, contrasena, done) => {

    User.findOne({'nombreusuario': nombreusuario})
        .then((user)=>{
            if (!user){
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
                     nuevoUsuario.correo = req.body.correo;
                     nuevoUsuario.telefono = req.body.telefono;
                     nuevoUsuario.telefonomovil = req.body.telefonomovil;
                     nuevoUsuario.contrasena = contrasena;
                     nuevoUsuario.nombreusuario = nombreusuario;
                     nuevoUsuario.informacion = req.body.informacion;

                 nuevoUsuario.save(function(err){
                    if(!err){
                        console.log('entro a registrar nuevo usuario')
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

module.exports = passport;
