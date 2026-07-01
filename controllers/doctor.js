const Doctor = require('../models/doctor')
const Secretary = require('../models/secretary')
const Clinic = require('../models/clinic')
const Patient = require('../models/patient')

module.exports.get = (req, res) => {
    res.render('doctor/home')
}


module.exports.getAddSecretary = async (req, res) => {
    res.render('doctor/addSecretary')
}


module.exports.getPatientsIndex = async (req, res) => {
    const patients = await Patient.find({})
    res.render('doctor/patientsIndex', { patients })
}

module.exports.getPatient = async (req, res) => {
    const { id } = req.params
    const patient = await Patient.findById(id)
    res.render('doctor/patient', { patient })
}

module.exports.getNewPatient = async (req, res) => {
    res.render('doctor/addPatient')
}


module.exports.getSecretaries = async (req, res) => {
    const doctor = await Doctor.findById('6a405d386b9c928f5dcae5ca').populate({
        path: 'secretaries',
        populate: { path: 'clinic' }
    });
    if (!doctor) {
        return res.status(404).send('Doctor not found');
    }
    const secretaries = doctor.secretaries
    res.render('doctor/secretaries', { secretaries })
}


module.exports.getSecretary = async (req, res) => {
    const { id } = req.params
    const secretary = await Secretary.findById(id).populate('clinic').populate('doctor')
    if (!secretary) {
        return res.status(404).send('Secretary not found')
    }
    res.render('doctor/secretary', { secretary })
}

module.exports.getSecretaryEdit = async (req, res) => {
    const { secretaryId } = req.params
    const secretary = await Secretary.findById(secretaryId).populate('clinic').populate('doctor')
    if (!secretary) {
        return res.status(404).send('Secretary not found')
    }
    res.render('doctor/secretaryEdit', { secretary })
}


module.exports.putSecretary = async (req, res) => {
    const { id } = req.params
    await Secretary.findByIdAndUpdate(id, req.body.secretary, { returnDocument: 'after', runValidators: true })
    res.redirect('/doctor/secretaries')
}

module.exports.deleteSecretary = async (req, res) => {
    const { id } = req.params;
    const deletedSecretary = await Secretary.findByIdAndDelete(id);
    if (!deletedSecretary) {
        return res.status(404).send('Secretary not found');
    }
    console.log(deletedSecretary)
    res.redirect('/doctor/secretaries');
}

module.exports.postPatient = async (req, res) => {
    const patient = new Patient(req.body.patient)
    const doctor = await Doctor.findById('6a405d386b9c928f5dcae5ca')
    doctor.patients.push(patient._id)
    await patient.save()
    await doctor.save()
    console.log(patient)
    res.redirect('/doctor/patients')
}

module.exports.putPatient = async (req, res) => {
    const { id } = req.params
    const patient = await Patient.findByIdAndUpdate(id, req.body.patient, { returnDocument: 'after', runValidators: true })
    console.log(patient)
    res.redirect(`/doctor/patient/${id}`)
}


module.exports.deletePatient = async (req, res) => {
    const { id } = req.params
    const deletedPatient = await Patient.findByIdAndDelete(id)
    if (!deletedPatient) {
        return res.status(404).send('Secretary not found');
    }
    console.log(deletedPatient)
    res.redirect('/doctor/patients')
}


module.exports.postSecretary = async (req, res) => {
    const doctor = await Doctor.findById('6a405d386b9c928f5dcae5ca')
    const clinic = await Clinic.findById('6a405d386b9c928f5dcae5cb')
    const secretary = new Secretary(req.body.secretary)
    secretary.clinic = clinic._id
    secretary.doctor = doctor._id
    clinic.secretaries.push(secretary._id);
    doctor.secretaries.push(secretary._id);
    await clinic.save();
    await doctor.save();
    await secretary.save()
    console.log(secretary)
    res.redirect('/doctor')
}