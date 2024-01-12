const { default: mongoose } = require('mongoose')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '2d'})
}

const createUser = async (req, res) => {
    const {firstName, lastName, email, password, type} = req.body

    let emptyFields = []

    if (!firstName){
        emptyFields.push('firstName')
    }
    if (!lastName){
        emptyFields.push('lastName')
    }
    if (!email){
        emptyFields.push('email')
    }
    if (!password){
        emptyFields.push('password')
    }
    if (!type){
        emptyFields.push('type')
    }
    if (emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields })
    }

    try {
        const user = await User.singUp(firstName, lastName, email, password, type)
        res.status(200).json({firstName, lastName, email, emptyFields})
    } catch (error) {
        res.status(401).json({error: error.message, emptyFields})
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const user = await User.logIn(email, password)
        const token = createToken(user._id)
        const firstName = user.firstName
        const lastName = user.lastName
        res.status(200).json({firstName, lastName, email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})
    res.status(200).json(users)
}

const getUser = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'User not found.'})
    }
    const user = await User.findById(id)
    if(!user){
        return res.status(404).json({error: 'User not found.'})
    }
    res.status(200).json(user)
}

const deleteUser = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'User not found.'})
    }
    const user = await User.findByIdAndDelete({_id: id})
    if(!user){
        return res.status(404).json({error: 'User not found.'})
    }
    res.status(200).json(user)
}

const updateUser = async (req, res) => {
    const {id} = req.params
    const {firstName, lastName, email, password, type} = req.body
    
    let emptyFields = []

    if (!firstName){
        emptyFields.push('firstName')
    }
    if (!lastName){
        emptyFields.push('lastName')
    }
    if (!email){
        emptyFields.push('email')
    }
    if (!password){
        emptyFields.push('password')
    }
    if (!type){
        emptyFields.push('type')
    }
    if (emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields })
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(402).json({error: 'User not found.'})
    }

    try {
        const user = await User.update(id, {...req.body})
        res.status(200).json(user)
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}
module.exports = {loginUser, createUser, getUsers, getUser, deleteUser, updateUser}