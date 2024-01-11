const express = require('express')
const { loginUser,
        createUser,
        getUsers,
        getUser,
        deleteUser,
        updateUser
    } = require('../controllers/userController')

const router = express.Router()

router.post('/login', loginUser)
router.post('/create', createUser)
router.get('/getUsers', getUsers)
router.get('/getUser/:id', getUser)
router.delete('/deleteUser/:id', deleteUser)
router.patch('/updateUser/:id', updateUser)









router.post('/test', async (req, res) =>{
    const {email, password} = req.body

    try {
        res.status(200).json({email, password})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})


module.exports = router