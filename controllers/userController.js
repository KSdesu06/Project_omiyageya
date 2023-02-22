const { validationResult } = require('express-validator')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config/index')
const e = require('express')

exports.alluser = async (req, res, next) => {
    const user = await User.find().sort({_id: -1})
    res.status(200).json({
        data: user
    })
}

exports.register = async (req, res, next) => {
    try {
        const {name, email, password} = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const error = new Error("The received data is not valid.")
            error.statusCode = 422
            error.validation = errors.array()
            throw error
        }

        const existEmail = await User.findOne({email: email})
        if(existEmail) {
            const error = new Error("This email is already registered.")
            error.statusCode = 400
            throw error
        }

        let user = new User()
        user.name = name
        user.email = email
        user.password = await user.encryptPassword(password)

        await user.save()

        res.status(201).json({
            message: "Registration successful."
        })
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body

        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            const error = new Error("The received data is not valid.")
            error.statusCode = 422
            error.validation = errors.array()
            throw error
        }

        const user = await User.findOne({email: email})
        if(!user) {
            const error = new Error("User not found.")
            error.statusCode = 400
            throw error
        }

        const isValid = await user.checkPassword(password)
        if (!isValid) {
            const error = new Error("Invalid password.")
            error.statusCode = 401
            throw error
        }

        const token = await jwt.sign({
            id: user._id,
            role: user.role
        },
        config.JWT_SECRET,
        {expiresIn: '3 days'})

        const expires_in = jwt.decode(token)

        res.status(200).json({
            access_token: token,
            expires_in: expires_in.exp,
            token_type: 'Bearer'
        })
    } catch (error) {
        next(error)
    }
}

exports.account = (req, res, next) => {
    const {role, name, email} = req.user
    res.status(200).json({
        name: name,
        email: email,
        role: role
    })
}