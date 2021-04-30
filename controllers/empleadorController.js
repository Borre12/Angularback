const empleador = require('../models/Empleador')

exports.crearEmpleador = async (req, res) =>{
    try{
        emp = new empleador(req.body)
        console.log(emp)
        await  emp.save()
        res.send(emp)
    }catch (error){
        console.log(error)
        res.status(500).send('Hubo un error');
    }
}
exports.obtenerEmpleador = async (req, res) =>{
    try{
        const emp = await empleador.find();
        res.json(emp)

    }catch (error){
        console.log(error)
        res.status(500).send('hubo un error')
    }
}
