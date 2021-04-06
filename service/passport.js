

const passport = require('passport');
const localStorage = require('passport-local').Strategy
const User = require('../models/registrousuario');

passport.use(new localStorage ({
    usernameField: 'nombreusuario',
    passwordField: 'contrasena'
},async (nombreusuario, contrasena, done) => {
    const user = User.findOne(nombreusuario)
    if (!user){
        return done(null, false, {message: 'nombreusuario no encontrado'})
    }else{
        const match = await user.passwordvalidation(contrasena)
        if (match){
            return done(null, user);
        } else{
            return done(null,false, {message: 'Contrasena incorrecta'})
        }
    }
}))

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser((id,done ) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

module.exports = passport;
