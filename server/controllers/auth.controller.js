const User = require('../models/user.model.js')
const jwt = require('jsonwebtoken')
const { expressjwt } = require("express-jwt")
const config = require('./../../config/config.js')

exports.signin = async (req, res) => {
    try {
        let user = await User.findOne({ "email": req.body.email })

        if (!user)
            return res.status('401').json({ error: "User not found" })

        if (!user.authenticate(req.body.password)) {
            return res.status('401').send({ error: "Email and password don't match." })
        }

        const token = jwt.sign({ _id: user._id }, config.jwtSecret)

        res.cookie('t', token, { expire: new Date() + 9999 })

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        return res.status('401').json({ error: "Could not sign in" })
    }
}

exports.signout = (req, res) => {
    res.clearCookie("t")
    return res.status('200').json({
        message: "signed out"
    })
}

exports.requireSignin = expressjwt({
    secret: config.jwtSecret,
    algorithms: ["HS256"],
    userProperty: 'auth'
})

exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth
        && req.profile._id == req.auth._id

    if (!(authorized)) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    
    next()
}
