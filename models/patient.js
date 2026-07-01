const mongoose = require('mongoose')
const Schema = mongoose.Schema

const patientSchema = new Schema({
    name: String,
    age: Number,
    phone: {
        type: String, 
        trim: true,
        match: [/^\+?[0-9]+$/, 'Phone number must contain only digits and an optional + at the beginning']
    },
    gender: {
        type: String,
        enum: ["male", "female", "LGBTQ+"]
    },
})

// messages: [Object]
// bookings: [Object]



patientSchema.post('findOneAndDelete', async function (doc) {
    // doc هو المريض الذي تم حذفه للتو
    if (doc) {
        // استدعاء مودل الدكتور (نستدعيه هنا لتجنب مشكلة الـ Circular Dependency)
        const Doctor = mongoose.model('Doctor'); 
        try {
            // البحث عن أي دكتور يمتلك معرف هذا المريض في مصفوفته وحذفه
            await Doctor.updateMany(
                { patients: doc._id }, 
                { $pull: { patients: doc._id } } 
            );
            console.log(`Successfully removed Patient ${doc._id} from Doctors arrays.`);
        } catch (error) {
            console.error("Error removing patient from doctors: ", error);
        }
    }
});


module.exports = mongoose.model('Patient', patientSchema)