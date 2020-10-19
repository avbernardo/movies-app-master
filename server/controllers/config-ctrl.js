const Configuracao = require('../models/configuracao-model')

createConfiguracao = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a configuracao',
        })
    }

    const configuracao = new Configuracao(body)

    if (!configuracao) {
        return res.status(400).json({ success: false, error: err })
    }

    configuracao
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: configuracao._id,
                message: 'configuracao created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'configuracao not created!',
            })
        })
}

updateConfiguracao = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    configuracao.findOne({ _id: req.params.id }, (err, configuracao) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'configuracao not found!',
            })
        }
        configuracao.horario_alimentacao = body.horario_alimentacao
        configuracao.time = body.time
        configuracao.rating = body.rating
        configuracao
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: configuracao._id,
                    message: 'configuracao updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'configuracao not updated!',
                })
            })
    })
}

deleteConfiguracao = async (req, res) => {
    await Configuracao.findOneAndDelete({ _id: req.params.id }, (err, configuracao) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!configuracao) {
            return res
                .status(404)
                .json({ success: false, error: `Configuracao not found` })
        }

        return res.status(200).json({ success: true, data: configuracao })
    }).catch(err => console.log(err))
}

getConfiguracaoById = async (req, res) => {
    await Configuracao.findOne({ _id: req.params.id }, (err, configuracao) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: configuracao })
    }).catch(err => console.log(err))
}

getConfiguracoes = async (req, res) => {
   
    await Configuracao.find({usuario_id : req.params.id}, (err, movies) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
       
        if (!movies.length) {
            return res
                .status(404)
                .json({ success: false, error: `Configuracao not found` })
        }
        return res.status(200).json({ success: true, data: movies })


    }).catch(err => console.log(err))
}

getConfiguracaoAtiva = async (req, res) => {
   
    await Configuracao.find({usuario_id : req.params.id , ativo : true}, (err, movies) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
       
        if (!movies.length) {
            return res
                .status(404)
                .json({ success: false, error: `Configuracao not found` })
        }
        return res.status(200).json({ success: true, data: movies })


    }).catch(err => console.log(err))
}

ativaConfig = async (req, res) => {

    Configuracao.update({ _id: {$ne : req.params.id}},{$set : {ativo : false}}, {multi : true}, (err, configuracao) => {
        if (err) {
            
        }else{
           
        }});
    
        Configuracao.update({ _id: req.params.id },{$set : {ativo : true}}, {multi : false}, (err, configuracao) => {
            if (err) {
                
            }else{
                return res.status(200).json({
                    success: true,
                    id: configuracao._id,
                    message: 'configuracao updated!',
                })
            }});

}


module.exports = {
    createConfiguracao,
    updateConfiguracao,
    deleteConfiguracao,
    getConfiguracoes,
    getConfiguracaoById,
    getConfiguracaoAtiva,
    ativaConfig
}
