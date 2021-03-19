const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuariosController')

router.post('/', usuarioController.crearUsuario)

module.exports = router
