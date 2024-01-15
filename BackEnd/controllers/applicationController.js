const { default: mongoose } = require('mongoose')
const Application = require('../models/applicationModel')
const User = require('../models/userModel')


const submitRequest = async (req, res) => {
    const {dateFrom, dateTo, reason} = req.body
    const user_id = req.user._id
    const status = 'Pending'
    try {
        const application = await Application.create({  user_id,
                                                        dateFrom,
                                                        dateTo,
                                                        reason,
                                                        status})
        res.status(200).json({application})
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

const getUserApplications = async (req, res) => {
    const user_id = req.user._id
    console.log(user_id)
    if(!mongoose.Types.ObjectId.isValid(user_id)){
        return res.status(400).json({error: 'User not found.'})
    }
    const user = await User.findById(user_id)
    if(!user){
        return res.status(404).json({error: 'User not found.'})
    }
    const applications = await Application.find({user_id}).sort({createdAt: -1})
    console.log(applications)
    res.status(200).json(applications)
}

const getApplication = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Application not found.'})
    }
    const application = await Application.findById(id)
    if(!application){
        return res.status(404).json({error: 'Application not found.'})
    }
    res.status(200).json(application)
}

const deleteApplication = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Application not found.'})
    }
    const application = await Application.findByIdAndDelete({_id: id})
    if(!application){
        return res.status(404).json({error: 'Application not found.'})
    }
    return res.status(200).json(application)
}

const updateApplication = async (req, res) => {
    const {id} = req.params
    const {status} = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Application not found.'})
    }
    const application = await Application.findByIdAndUpdate({_id: id}, {status})
    if(!application){
        return res.status(404).json({error: 'Application not found.'})
    }
    return res.status(200).json(application)
}

module.exports = {
    submitRequest,
    getUserApplications,
    getApplication,
    deleteApplication,
    updateApplication
}