const express = require('express')
const router = express.Router()

const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')

const { getReviews, addReview, deleteReview } = require('./review.controller')


router.get('/:toyId', log, getReviews)
router.post('/',  log, requireAuth, addReview)
router.delete('/:id',  requireAuth, deleteReview)

module.exports = router