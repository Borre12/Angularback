const usuarioController = require('../controllers/usuariosController')
const passport = require('../service/passport');
const router = require('express').Router();

router.post('/register',  passport.authenticate('register'));
router.get('', usuarioController.obtenerusuarios);
router.post('/login', passport.authenticate('/login'));

module.exports = router
