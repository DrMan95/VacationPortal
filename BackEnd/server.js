const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const applicationRoutes = require('./routes/applicationRoutes')
const adminRoutes = require('./routes/adminRoutes')

const app = express()

//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method, req.body)
    next()
})

//routes
app.use('/api/user', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/application', applicationRoutes)

app.get('/', (req , res) => {
    res.json({msg: 'wellcome'})
})

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listening for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & Listening to port',process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

