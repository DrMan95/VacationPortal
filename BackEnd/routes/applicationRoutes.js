const express = require('express')
const { submitRequest,
        getUserApplications,
        getApplication,
        deleteApplication
    } = require('../controllers/applicationController')
    
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.post('/submitRequest', submitRequest)
router.get('/getUserApplications', getUserApplications)
router.get('/getApplication/:id', getApplication)
router.delete('/deleteApplication/:id', deleteApplication)

module.exports = router