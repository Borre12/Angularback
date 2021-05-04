const express = require('express');
const conexion = require('./config/bd')
const passport = require('./service/passport');
const passportemp = require('./service/passportEmp')
const flash = require('express-flash');
const cors = require('cors')
conexion()
const app = express()
app.use(express.json())
app.use(flash());
app.use(require('express-session') ({
    secret: "any words",
    resave: false,
    saveUninitialized: false
}))


app.use(cors());

app.use(passport.initialize())
app.use(passport.session())
app.use(passportemp.initialize())
app.use(passportemp.session)
app.use('/home/usuarios', require('./routes/registrousuario'))
app.use('/home/empleador', require('./routes/EmpleadorRoutes'))
app.listen(4000, ()=> {
    console.log('si entro')
})

