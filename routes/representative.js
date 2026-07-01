const express = require('express')
const router = express.Router()
const AppError = require('../utils/error')
const catchAsync = require('../utils/catchAsync')
const representative = require('../controllers/representative')

// const multer = require('multer')
// const { storage } = require('../cloudinary/index')
// const upload = multer({ storage })
// const router = express.Router({ mergeParams: true })


router.get('/representative', representative.getHomeRepresentative)
router.get('/representative/index', catchAsync(representative.getindex))
router.get('/representative/clinic/new', representative.getAddClinic)
router.get('/representative/:clinicId/edit', catchAsync(representative.getEditClinic))
router.post('/clinic', catchAsync(representative.postClinic))
router.put('/clinic/:clinicId', catchAsync(representative.putClinic))
module.exports = router