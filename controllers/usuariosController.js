const Usuario = require('../models/Usuarios')

exports.crearUsuario = async (req, res) =>{
  try{
      usuario = new Usuario(req.body)
        console.log(usuario)
    await  usuario.save()
      res.send(usuario)
  }catch (error){
      console.log(error)
      res.status(500).send('Hubo un error');
  }
}
exports.obtenerusuarios = async (req, res) =>{
    try{
        const usuarios = await Usuario.find();
        res.json(usuarios)

    }catch (error){
        console.log(error)
        res.status(500).send('hubo un error')
    }
}
