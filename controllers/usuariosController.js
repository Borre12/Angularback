const registrousuario = require('../models/registrousuario')
const jwt  = require('jsonwebtoken')
const passport = require('passport');
const localStorage = require('passport-local').Strategy

exports.crearUsuario = async (req, res) =>{
  try{
      usuario = new registrousuario(req.body)

    await  usuario.save()
      res.send(usuario)
  }catch (error){
      console.log(error)
      res.status(500).send('Hubo un error');
  }
}

exports.obtenerusuarios = async (req, res) =>{
    try{
        const usuarios = await registrousuario.find();
        res.json(usuarios)

    }catch (error){
        console.log(error)
        res.status(500).send('hubo un error')
    }
}

exports.loginuser =  () =>{

    passport.use(new localStorage ({
        usernameField: 'nombreusuario',
        passwordField: 'contrasena'
    },async (nombreusuario, contrasena, done) => {
        const user = registrousuario.findOne(nombreusuario)
        if (!user){
            return done(null, false, {message: 'nombreusuario no encontrado'})
        }else{
            const match = await user.encontrarcontrasena(contrasena)
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

    passport.deserializeUser((_id,done ) => {
        User.findById(_id, (err, user) => {
            done(err, user)
        })
    })

}
