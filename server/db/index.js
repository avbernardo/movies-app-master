const mongoose = require('mongoose')
const config = require('../config.json')

mongoose
    .connect(`mongodb+srv://${config.login}:${config.password}@clusterrobotica.vzukr.mongodb.net/${config.db}?retryWrites=true&w=majority`,{ useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
