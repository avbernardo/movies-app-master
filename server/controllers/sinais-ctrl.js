const { isValidObjectId } = require('mongoose')
const Sinal = require('../models/sinais-model')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

createSinal = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a configuracao',
        })
    }

    const configuracao = new Sinal(body)

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
    await Configuracao.find({}, (err, movies) => {
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

updateSinalDespejaRacao = async (req, res) => {

 

    Sinal.update({ _id: ObjectId('5f8797ae41953cee8d7822db') },{$set : {despejar_racao : 1}}, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
    });

}

updateSinalDespejaAgua = async (req, res) => {

 

    Sinal.update({ _id: ObjectId('5f8797ae41953cee8d7822db') },{$set : {despejar_agua : 1}}, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
    });

}

getSinais = async (req, res) => {
    await Sinal.find({}, (err, sinais) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!sinais.length) {
            return res
                .status(404)
                .json({ success: false, error: `Usuario not found` })
        }
        return res.status(200).json({ success: true, data: sinais })
    }).catch(err => console.log(err))
}

module.exports = {
    createConfiguracao,
    updateConfiguracao,
    deleteConfiguracao,
    getConfiguracoes,
    getConfiguracaoById,
    updateSinalDespejaRacao,
    updateSinalDespejaAgua,
    getSinais
}
