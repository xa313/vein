const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Doctor = require('./doctor')
const Clinic = require('./clinic')

const secretarySchema = new Schema({
    name: String,
    phone: {
        type: String, 
        trim: true,
        match: [/^\+?[0-9]+$/, 'Phone number must contain only digits and an optional + at the beginning']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    clinic: {
        type: Schema.Types.ObjectId,
        ref: 'Clinic'
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor'
    }
})

secretarySchema.post('findOneAndDelete', async function (doc) {
    // doc هو السكرتير الذي تم حذفه للتو
    if (doc) {
        const Doctor = mongoose.model('Doctor'); 
        const Clinic = mongoose.model('Clinic')
        const updatePromises = [];
        if (doc.doctor) {
            updatePromises.push(
                Doctor.findByIdAndUpdate(doc.doctor, {
                    $pull: { secretaries: doc._id }
                })
            );
        }
        if (doc.clinic) {
            updatePromises.push(
                Clinic.findByIdAndUpdate(doc.clinic, {
                    $pull: { secretaries: doc._id }
                })
            );
        }
        await Promise.all(updatePromises);
        console.log(`Successfully removed Secretary ${doc._id} from Doctor and Clinic.`);
    }
});
module.exports = mongoose.model('Secretary', secretarySchema)