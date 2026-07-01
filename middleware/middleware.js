const AppError = require('../utils/error')

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params
    const camp = await Campground.findById(id)
    if (!camp) {
        req.flash('error', 'Cannot find that camp!');
        return res.redirect(`/campgrounds/${id}`);
    }
    if (!camp.author.equals(req.user._id)) {
        req.flash('error', 'U dont have perimssion to do that')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}
module.exports.isAuthorReview = async (req, res, next) => {
    const { id, reviewId } = req.params
    const review = await Review.findById(reviewId)
    if (!review) {
        req.flash('error', 'Cannot find that review!');
        return res.redirect(`/campgrounds/${id}`);
    }
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'U dont have perimssion to do that')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}