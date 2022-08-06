const { Router } = require('express')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const controller = require('../controllers/homeFunctions')



router.get('/', (req,res) => {
    res.render('login')
})

router.get('/signup', (req,res) => {
    res.render('signup')
})

router.post('/', controller.login)

router.post('/signup', controller.signup)

router.get('/verify', controller.verify)

module.exports = router