const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Clinics = require('./clinic')
const Secretary = require('./secretary')
const Patient = require('./patient')

const doctorSchema = new Schema({
    name: String,
    phone: {
        type: String, 
        trim: true,
        match: [/^\+?[0-9]+$/, 'Phone number must contain only digits and an optional + at the beginning']
    },
    clinics: [{
        type: Schema.Types.ObjectId,
        ref: 'Clinic'
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