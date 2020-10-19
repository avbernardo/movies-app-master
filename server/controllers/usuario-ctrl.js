const Usuario = require('../models/usuario-model')
var passwordHash = require('password-hash');

createUsuario = (req, res) => {

    const body = req.body
    var hashSenha = passwordHash.generate(req.body.senha)
    body.senha = hashSenha
   
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a usuario',
        })
    }

    const usuario = new Usuario(body)

    if (!usuario) {
        return res.status(400).json({ success: false, error: err })
    }

    usuario
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: usuario._id,
                message: 'usuario created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'usuario not created!',
            })
        })
}

updateUsuario = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    usuario.findOne({ _id: req.params.id }, (err, usuario) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'usuario not found!',
            })
        }
        usuario.horario_alimentacao = body.horario_alimentacao
        usuario.time = body.time
        usuario.rating = body.rating
        usuario
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: usuario._id,
                    message: 'usuario updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'usuario not updated!',
                })
            })
    })
}

deleteUsuario = async (req, res) => {
    await Usuario.findOneAndDelete({ _id: req.params.id }, (err, usuario) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!usuario) {
            return res
                .status(404)
                .json({ success: false, error: `Usuario not found` })
        }

        return res.status(200).json({ success: true, data: usuario })
    }).catch(err => console.log(err))
}

getUsuarioById = async (req, res) => {
    await Usuario.findOne({ _id: req.params.id }, (err, usuario) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: usuario })
    }).catch(err => console.log(err))
}

getUsuarioByLogin = async (req, res) => {
    await Usuario.findOne({ usuario : req.body.usuario }, (err, usuario) => {

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
       if(usuario){
        if(passwordHash.verify(req.body.senha,usuario.senha)){
            return res.status(200).json({ success: true, data: usuario })
        }else{
            return res.status(402).json({succes : false, error : `Credenciais incorretas`})
        }
    }else{
        return res.status(402).json({succes : false, error : `Credenciais incorretas`})
    }
 
    }).catch(console.log(err))
}

getUsuario = async (req, res) => {
    await Usuario.find({}, (err, movies) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!movies.length) {
            return res
                .status(404)
                .json({ success: false, error: `Usuario not found` })
        }
        return res.status(200).json({ success: true, data: movies })
    }).catch(err => console.log(err))
}

module.exports = {
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuario,
    getUsuarioById,
    getUsuarioByLogin
}
