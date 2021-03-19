const mongoose = require('mongoose')
require('dotenv').config({path: 'conexion.env'});

const conectarbd = async () => {
    if(conectarbd){
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('base de datos conectada')
    }else{
        console.log('base de datos no conectada')
        process.exit(1)
    }
}

module.exports = conectarbd
