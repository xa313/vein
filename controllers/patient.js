const Patient = require('../models/patient')
const Doctor = require('../models/doctor')


module.exports.getHome = async (req, res) => {
    const patient = await Patient.findById('6a41f59e8e52d1eef84edcb1')
    res.render('patient/home', { patient })
}

module.exports.getNewPatient = (req, res) => {
    res.render('patient/new')
}

module.exports.getDoctors = async (req, res) => {
    const doctors = await Doctor.find({})
    res.render('patient/doctorsIndex', { doctors })
}

module.exports.getDoctor = async (req, res) => {
    const { id } = req.params
    const doctor = await Doctor.findById(id).populate('clinics')
    res.render('patient/doctor', { doctor })
}


module.exports.getPatient = async (req, res) => {
    const { id } = req.params
    const patient = await Patient.findById(id)
    res.render('patient/patient', { patient })
}

module.exports.putPatient = async (req, res) => {
    const { id } = req.params
    const patient = await Patient.findByIdAndUpdate(id, req.body.patient, { returnDocument: 'after', runValidators: true })
    console.log(patient)
    res.redirect(`/patient/${id}`)
}

module.exports.deletePatient = async (req, res) => {
    const { id } = req.params
    const deletedPatient = await Patient.findByIdAndDelete(id)
    if (!deletedPatient) {
        return res.status(404).send('Secretary not found');
    }
    console.log(deletedPatient)
    res.redirect('/patients')
}

module.exports.postPatient = async (req, res) => {
    const patient = new Patient(req.body.patient)
    await patient.save()
    console.log(patient)
    res.redirect('/patient/home')
}