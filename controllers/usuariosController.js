const registrousuario = require('../models/registrousuario')
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
