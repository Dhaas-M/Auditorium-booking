const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const router = express.Router()
const profile = require('../controllers/profileFunction')

router.get('/admin/:email', profile.admin)
router.get('/client/:email', profile.client)

module.exports = router