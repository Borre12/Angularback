const empleadorController = require('../controllers/empleadorController')
const passport = require('../service/passport');
const router = require('express').Router();

router.post('/register',  passport.authenticate('register'), (req, res) => res.json(req.emp));
router.get('', empleadorController.obtenerEmpleador);
router.post('/login', passport.authenticate('login'), (req, res) => res.json(req.emp));
router.get('/logout', function(req, res){req.logout(); res.sendStatus(204)});

module.exports = router
