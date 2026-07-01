const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Clinics=require('./clinic')

const representativeSchema = new Schema({
    name: String,
    phone: {
        type: String, 
        trim: true,
        match: [/^\+?[0-9]+$/, 'Phone number must contain only digits and an optional + at the beginning']
    },
    clinics: [{
        type: Schema.Types.ObjectId,
        ref:'Clinic'
    }]
})
module.exports = mongoose.model('Representative', representativeSchema)