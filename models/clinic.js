const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Representative = require('./representative')
const Secretary = require('./secretary')
const Doctor = require('./doctor')

const clinicSchema = new Schema({
    name: String,
    phone: {
        type: String, 
        trim: true,
        match: [/^\+?[0-9]+$/, 'Phone number must contain only digits and an optional + at the beginning']
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Representative'
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    secretaries: [{
        type: Schema.Types.ObjectId,
        ref: 'Secretary'
    }],
    description: String,
    location: String,
    googleMap: String
})
module.exports = mongoose.model('Clinic', clinicSchema)