const { default: mongoose } = require('mongoose')
const Application = require('../models/applicationModel')
const User = require('../models/userModel')
const nodemailer = require('nodemailer')

const validDates = (d1, d2) => {
    let date1 = new Date(d1).getTime()
    let date2 = new Date(d2).getTime()

    return !(date1 > date2)
}

const submitRequest = async (req, res) => {
    const {dateFrom, dateTo, reason} = req.body
    if (!validDates(dateFrom, dateTo)){
        res.status(401).json({error: 'Not valid dates'})
    }
    const user_id = req.user._id
    const user = await User.findById({ _id: user_id.valueOf()})
    const status = 'Pending'
    try {
        const application = await Application.create({  user_id,
                                                        dateFrom,
                                                        dateTo,
                                                        reason,
                                                        status})
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_EMAIL_PASSWORD
            }
        })

        const approve_link = 'http://localhost:4000/api/admin/approveUserApplication/' + application._id
        const reject_link = 'http://localhost:4000/api/admin/rejectUserApplication/' + application._id
        
        var mailOptions = {
            from: process.env.APP_EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: 'New Vacations Application',
            html: `<!DOCTYPE html>
                    <html lang="en">
                        <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            margin: 20px;
                            }
                        
                            .button {
                            display: inline-block;
                            padding: 10px 20px;
                            margin: 10px;
                            text-align: center;
                            text-decoration: none;
                            background-color: #007bff;
                            border-radius: 5px;
                            }
                            .button.approve {
                            background-color: #4caf50;
                            color: #fff;
                            }
                        
                            .button.reject {
                            background-color: #f44336;
                            color: #fff;
                            }
                        
                            .button:hover {
                            background-color: #0056b3;
                            }
                        </style>
                        <title>Vacation Request</title>
                        </head>
                        <body>
                        <p>Dear supervisor,</p>
                        <p>Employee: ${user.firstName} ${user.lastName} has requested for some time off</p>
                        <p>Starting on ${dateFrom} and ending on ${dateTo}</p>
                        <p>Stating the reason: "${reason}"</p>
                        <p>Click on one of the below links to approve or reject the application:</p>
                        <a class="button approve" href="${approve_link}">Approve</a>
                        <a class="button reject" href="${reject_link}">Reject</a>
                        </body>
                    </html>`
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        })
        
        res.status(200).json({application})
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

const getUserApplications = async (req, res) => {
    const user_id = req.user._id
    if(!mongoose.Types.ObjectId.isValid(user_id)){
        return res.status(400).json({error: 'User not found.'})
    }
    const user = await User.findById(user_id)
    if(!user){
        return res.status(404).json({error: 'User not found.'})
    }
    const applications = await Application.find({user_id}).sort({createdAt: -1})
    res.status(200).json(applications)
}

const getApplication = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Application not found.'})
    }
    const application = await Application.findById(id).sort({createdAt: -1})
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

const approveApplication = async (req, res) => {
    const {id} = req.params
    const status = 'Approved'
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Application not found.'})
    }
    const application = await Application.findByIdAndUpdate({_id: id}, {status})
    if(!application){
        return res.status(404).json({error: 'Application not found.'})
    }

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.APP_EMAIL_PASSWORD
        }
    })

    const user = await User.findById(application.user_id.valueOf())
    const user_email = user.email
    const submission_date = application.createdAt
    
    var mailOptions = {
        from: process.env.APP_EMAIL,
        to: user_email,
        subject: 'New Vacations Application',
        text:   `Dear employee,\n
                Your supervisor has approved your application submitted on\n
                ${submission_date}.`
    }
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    })

    return res.status(200).json({message: 'Application approved successfully.'})
}

const rejectApplication = async (req, res) => {
    const {id} = req.params
    const status = 'Rejected'
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Application not found.'})
    }
    const application = await Application.findByIdAndUpdate({_id: id}, {status})
    if(!application){
        return res.status(404).json({error: 'Application not found.'})
    }
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.APP_EMAIL_PASSWORD
        }
    })

    const user = await User.findById(application.user_id.valueOf())
    const user_email = user.email
    const submission_date = application.createdAt
    
    var mailOptions = {
        from: process.env.APP_EMAIL,
        to: user_email,
        subject: 'New Vacations Application',
        text:   `Dear employee,\n
                Your supervisor has rejected your application submitted on\n
                ${submission_date}.`
    }
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    })

    return res.status(200).send('Application rejected successfully.')
}

module.exports = {
    submitRequest,
    getUserApplications,
    getApplication,
    deleteApplication,
    approveApplication,
    rejectApplication
}