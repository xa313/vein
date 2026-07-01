const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const multer = require('multer')
const morgan = require('morgan')
const AppError = require('./utils/error')
const doctorRotes = require('./routes/doctor')
const godviewRotes = require('./routes/godview')
const patientRotes = require('./routes/patient')
const representativeRotes = require('./routes/representative')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('ejs', ejsMate)


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(morgan('tiny'))


mongoose.connect('mongodb://127.0.0.1:27017/vein')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err))

app.listen(8080, () => {
    console.log('server is working:>')
})

app.use('/', doctorRotes)
app.use('/', patientRotes)
app.use('/', godviewRotes)
app.use('/', representativeRotes)
app.all('/{*path}', (req, res, next) => {
    next(new AppError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    console.log("🔥 ERROR:", err.message)
    next(err)
})

app.use((err, req, res, next) => {
    const { status = 500 } = err
    if (!err.message) err.message = 'Oh no! Error'
    res.status(status).render('error', { err })
})
