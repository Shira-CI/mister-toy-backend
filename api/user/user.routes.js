const express = require('express')
const router = express.Router()

const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getUser, getUsers, deleteUser, updateUser } = require('./user.controller')

// If we want a specific middleware (i.e. requireAuth) 
// to be activated on all end points of this router:
// router.use(requireAuth)

router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id',  updateUser)

router.delete('/:id',  requireAuth, requireAdmin, deleteUser)

module.exports = router