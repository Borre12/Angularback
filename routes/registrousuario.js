const usuarioController = require('../controllers/usuariosController')
const passport = require('../service/passport');
const router = require('express').Router();

router.post('/register',  passport.authenticate('register'), (req, res) => res.json(req.user));
router.get('', usuarioController.obtenerusuarios);
router.post('/login', passport.authenticate('login'), (req, res) => res.json(req.user));
router.get('/logout', function(req, res){req.logout(); res.sendStatus(204)});

module.exports = router
