const Representative = require('../models/representative')


module.exports.getHome = (req, res) => {
    res.render('godview/home')
}

module.exports.getAddRepresentative = (req, res) => {
    res.render('godview/addRepresentative')
}

module.exports.postAddRepresentative = async (req, res) => {
    const representative = new Representative(req.body.representative)
    await representative.save()
    console.log(representative)
    res.redirect('/godview')
}