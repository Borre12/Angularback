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
