const mongoose = require('mongoose')

const Schema = mongoose.Schema

const applicationSchema = new Schema({
    user_id:{
        type: String,
        require: true
    },
    dateFrom:{
        type: Date,
        require: true
    },
    dateTo:{
        type: Date,
        require: true
    },
    reason:{
        type: String,
        require: true
    },
    status:{
        type: String,
        require: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Application', applicationSchema)