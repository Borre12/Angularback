const express = require('express')
const usuarioController = require('../controllers/usuariosController')
const passport = require('../service/passport');
const router = require('express').Router();

router.post('/', usuarioController.crearUsuario)
router.get('', usuarioController.obtenerusuarios);
router.post('/login', passport.authenticate('/login', {
    successRedirect: '',
    failureRedirect: '/login',
    failureFlash: true,
}));

module.exports = router
