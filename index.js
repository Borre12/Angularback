const express = require('express');
const conexion = require('./config/bd')

conexion()
const app = express()
app.use(express.json())

app.use('/home/usuarios', require('./routes/registrousuario'))

app.get('/', (req, res) =>{
    res.send("Gano hereetics");
})

app.listen(4000, ()=> {
    console.log('si entro')
})
