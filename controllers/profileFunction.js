const mongoose = require('mongoose')
const User = require('../models/user')

exports.admin = async (req,res) => {
      const email = req.params.email
      const user = await User.findOne({email: email})
      res.render('admin-profile', { user:user })     
}

exports.client = async (req,res) => {
    const email = req.params.email
    const user = await User.findOne({email: email})
    res.render('client-profile', { user:user })     
}