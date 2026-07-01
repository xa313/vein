const Doctor = require('../models/doctor')
const Clinic = require('../models/clinic')
const Representative = require('../models/representative')



module.exports.getHomeRepresentative = (req, res) => {
    res.render('representative/home')
}


module.exports.getAddClinic = (req, res) => {
    res.render('representative/addClinic')
}


module.exports.getindex = async (req, res) => {
    const representativeId = await Representative.findById('6a405d0dcb3fdf0d9af93662')
    const clinics = await Clinic.find({ createdBy: representativeId }).lean()
    res.render('representative/index', { clinics })
}


module.exports.getEditClinic = async (req, res) => {
    const id = req.params.clinicId
    const clinic = await Clinic.findById(id).populate('doctor')
    if (!clinic) {
        return res.redirect('/representative')
    }
    res.render('representative/editClinic', { id, clinic })
}

module.exports.putClinic = async (req, res) => {
    const id = req.params.clinicId
    const upDatedClinic = await Clinic.findByIdAndUpdate(id,
        { ...req.body.clinic },
        {
            returnDocument: 'after',
            runValidators: true
        })
    if (upDatedClinic) {
        const doctor = await Doctor.findByIdAndUpdate(upDatedClinic.doctor,
            { ...req.body.doctor },
            {
                returnDocument: 'after',
                runValidators: true
            })
    }
    res.redirect('/representative')

}

module.exports.postClinic = async (req, res) => {
    const doctor = new Doctor(req.body.doctor)
    const clinic = new Clinic(req.body.clinic)
    const representative = await Representative.findById('6a405d0dcb3fdf0d9af93662')
    doctor.clinics.push(clinic._id)
    clinic.doctor = doctor
    clinic.createdBy = representative
    representative.clinics.push(clinic._id)
    await representative.save()
    await doctor.save()
    await clinic.save()
    console.log(req.body)
    console.log(doctor)
    console.log(clinic)
    console.log(representative)
    res.redirect('/representative')
}