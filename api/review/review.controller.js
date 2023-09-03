const logger = require('../../services/logger.service')
const reviewService = require('./review.service')
const userService = require('../user/user.service')
const authService = require('../auth/auth.service')

async function getReviews(req, res) {
    const { toyId } = req.params
    if (!toyId)  res.send([])
    try {
        const reviews = await reviewService.query(toyId)
        res.send(reviews)
        console.log("reviews", reviews)
    } catch (err) {
        logger.error('Cannot get reviews', err)
        res.status(400).send({ err: 'Failed to get reviews' })
    }
}

async function deleteReview(req, res) {
    try {
        const deletedCount = await reviewService.remove(req.params.id)
        if (deletedcount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove review' })
        }
    } catch (err) {
        logger.error('Failed to delete review', err)
        res.status(400).send({ err: 'Failed to delete review' })
    }
}

async function addReview(req, res) {
    let { loggedinUser } = req

    try {
        let review = req.body
        // This line adds the userId (author of the review) to review object
        review.byUserId = loggedinUser._id
        console.log("review before adding", review)
        review = await reviewService.add(review)

        console.log("review from controller", review)
        // prepare the updated review for sending out

        loggedinUser = await userService.update(loggedinUser)
        review.byUser = loggedinUser

        // User info is also saved in the login-token, update it
        const loginToken = authService.getLoginToken(loggedinUser)
        res.cookie('loginToken', loginToken)

        delete review.aboutToyId
        delete review.byUserId

        res.send(review)
    }
    catch (err) {
        logger.error('Failed to add review', err)
        res.status(400).send({ err: 'Failed to add review' })
    }
}

module.exports = {
    getReviews,
    deleteReview,
    addReview
}