const express = require('express')
const router = express.Router()

const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')

const { getToys, getToyById, addToy, updateToy, removeToy, addToyMsg, removeToyMsg } = require('./toy.controller')

// If we want a specific middleware (i.e. requireAuth) 
// to be activated on all end points of this router:
// router.use(requireAuth)



router.get('/', log, getToys)
router.get('/:id', getToyById)

//inclass:
router.post('/', log, requireAuth, addToy)
router.put('/:id', requireAuth, updateToy)
router.delete('/:id', requireAuth, requireAdmin, removeToy)
// router.delete('/:id', requireAuth, removeToy)


/////////////////////////////////
//for testing only
// router.post('/', log, addToy)
// router.put('/:id', updateToy)
// router.delete('/:id',  removeToy)
/////////////////////////////////


router.post('/:id/msg', requireAuth, addToyMsg)
router.delete('/:id/msg/:msgId', requireAuth, removeToyMsg)

module.exports = router