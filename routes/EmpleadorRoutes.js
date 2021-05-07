const empleadorController = require('../controllers/empleadorController')
const passport = require('../service/passportEmp')
const router = require('express').Router();

router.post('/registerEmp', passport.authenticate('registerEmp') , (req, res) => res.json(req.emp));
router.get('', empleadorController.obtenerEmpleador);
router.post('/loginEmp', passport.authenticate('loginEmp'));
router.get('/logout', function(req, res){req.logout(); res.sendStatus(204)});

module.exports = router
