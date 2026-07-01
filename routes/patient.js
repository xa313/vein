const express = require('express')
const router = express.Router()
const AppError = require('../utils/error')
const catchAsync = require('../utils/catchAsync')
const patient = require('../controllers/patient')


router.get('/patient/home', catchAsync(patient.getHome))
router.get('/patient/new', patient.getNewPatient)
router.get('/patient/doctors', catchAsync(patient.getDoctors))
router.get('/patient/doctor/:id', catchAsync(patient.getDoctor))
router.get('/patient/:id', catchAsync(patient.getPatient))
router.post('/patient', catchAsync(patient.postPatient))
router.put('/patient/:id', catchAsync(patient.putPatient))
router.delete('/patient/:id', catchAsync(patient.deletePatient))

module.exports = router