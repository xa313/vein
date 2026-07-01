const express = require('express')
const router = express.Router()
const AppError = require('../utils/error')
const catchAsync = require('../utils/catchAsync')
const godview = require('../controllers/godview')

// const multer = require('multer')
// const { storage } = require('../cloudinary/index')
// const upload = multer({ storage })
// const router = express.Router({ mergeParams: true })


router.get('/godview', godview.getHome)
router.get('/godview/representative/new', godview.getAddRepresentative)
router.post('/representative', catchAsync(godview.postAddRepresentative))
module.exports = router