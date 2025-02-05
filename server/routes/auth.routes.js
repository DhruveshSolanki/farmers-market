const express = require('express');
const authCtrl = require('../controllers/auth.controller.js')

const router = express.Router()

router.route('/auth/signin').post(authCtrl.signin)

//router.route('/auth/signin').post(authCtrl.signin)

router.route('/auth/signout').get(authCtrl.signout)

router.route('/auth/signout')
    .get(authCtrl.signout)

module.exports = router;