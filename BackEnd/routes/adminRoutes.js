const express = require('express')
const { createUser,
        getUsers,
        getUser,
        deleteUser,
        updateUser
    } = require('../controllers/userController')
const { approveApplication,
        rejectApplication 
    } = require('../controllers/applicationController')

const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

router.get('/approveUserApplication/:id', approveApplication)
router.get('/rejectUserApplication/:id', rejectApplication)

router.use(requireAuth)
router.post('/createUser', createUser)
router.get('/getUsers', getUsers)
router.get('/getUser/:id', getUser)
router.delete('/deleteUser/:id', deleteUser)
router.patch('/updateUser/:id', updateUser)

module.exports = router