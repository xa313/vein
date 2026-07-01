const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Clinics = require('./clinic')
const Secretary = require('./secretary')
const Patient = require('./patient')

const doctorSchema = new Schema({
    name: String,
    phone: Number,
    clinics: [{
        type: Schema.Types.ObjectId,
        ref: 'Clinics'
    }],
    secretaries: [{
        type: Schema.Types.ObjectId,
        ref: 'Secretary'
    }],
    patients: [{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }],
    specialization:[String]

})
// booking:[obj]
// message:[obj]
module.exports = mongoose.model('Doctor', doctorSchema)