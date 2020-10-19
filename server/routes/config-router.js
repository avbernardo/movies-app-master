const express = require('express')

const ConfigCtrl = require('../controllers/config-ctrl')
const UserCtrl = require('../controllers/usuario-ctrl')
const SinaisCtrl = require('../controllers/sinais-ctrl')

const router = express.Router()

router.post('/configuracao', ConfigCtrl.createConfiguracao)
router.put('/configuracao/:id', ConfigCtrl.updateConfiguracao)
router.delete('/configuracao/:id', ConfigCtrl.deleteConfiguracao)
router.get('/configuracao/:id', ConfigCtrl.getConfiguracaoById)
router.get('/configuracoes/:id', ConfigCtrl.getConfiguracoes)
router.post('/usuario', UserCtrl.createUsuario)
router.get('/usuarios',UserCtrl.getUsuario)
router.get('/configuracao_ativa/:id',ConfigCtrl.getConfiguracaoAtiva)
router.post('/login',UserCtrl.getUsuarioByLogin)
router.get('/usuario/:id',UserCtrl.getUsuarioById)
router.post('/ativa_configuracao/:id/:usuario',ConfigCtrl.ativaConfig)
router.post('/sinal_racao', SinaisCtrl.updateSinalDespejaRacao)
router.post('/sinal_agua',SinaisCtrl.updateSinalDespejaAgua)
router.get('/sinais',SinaisCtrl.getSinais)
//router.post('/sinais',)
module.exports = router
