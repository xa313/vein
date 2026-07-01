const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Representative = require('./representative')
const Secretary = require('./secretary')
const Doctor = require('./doctor')
const Clinics = require('./clinic')
const Patient = require('./patient')


const appointmentSchema = new Schema({
    time: {
        type: Date,
        required: true,
        default: Date.now
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    selectedSpecialization: {
        type: String,
        required: true
    },
    clinic: {
        type: Schema.Types.ObjectId,
        ref: 'Clinic'
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema)