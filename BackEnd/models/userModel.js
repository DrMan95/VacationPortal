const mongoose = require('mongoose')
const bcrypt =  require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    type:{
        type: String,
        require: true
    }
}, { timestamps: true })

//static singUp user 
userSchema.statics.singUp = async function(firstName, lastName, email , password, passwordC, type){

    //validation
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }
    if(password != passwordC){
        throw Error('Passwords are not equal')
    }
    const exist = await this.findOne({email})
    if (exist){
        throw Error('Email allready exist.')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({firstName, lastName, email, password: hash, type})

    return user
}

//static login user
userSchema.statics.logIn = async function(email, password){
    //validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({email})
    if (!user){
        throw Error('Incorrect email.')
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Incorrect password')
    }
    return user
}

userSchema.statics.update = async function(id, reqJson){
    
    const firstName = reqJson.firstName
    const lastName = reqJson.lastName
    const email = reqJson.email
    const password = reqJson.password
    const passwordC = reqJson.passwordC
    const type = reqJson.type

    if(!firstName || !lastName || !email || !password || !type){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(password != passwordC){
        throw Error('Passwords are not equal')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }
    const user = await this.findByIdAndUpdate({_id: id}, {firstName, lastName, email, password, type})

    return user
}

module.exports = mongoose.model('User', userSchema)