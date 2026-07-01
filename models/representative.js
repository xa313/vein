const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Clinics=require('./clinic')

const representativeSchema = new Schema({
    name: String,
    phone: Number,
    clinics: [{
        type: Schema.Types.ObjectId,
        ref:'Clinic'
    }]
})
module.exports = mongoose.model('Representative', representativeSchema)