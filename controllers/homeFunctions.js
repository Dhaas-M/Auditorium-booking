const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const utilis = require('../controllers/utilis')

exports.signup = async (req,res) => {
     try{
         const { name,email,contact,adminCode,password,cPassword } = req.body
         const emailToken = crypto.randomBytes(64).toString('hex')
         const user = new User({
             name:name,
             email:email,
             contactNumber:contact,
             password:password,
             emailToken: emailToken,
             isVerified:false,
             isAdmin:false
         })

         const salt = await bcrypt.genSalt(10)
         const hashedPassword = await bcrypt.hash(user.password, salt)
         user.password = hashedPassword
         if(adminCode=="test"){
             user.isAdmin = true
         }
         else {
             user.isAdmin = false
         }

         const newUser = await user.save()
         
         utilis.sendMail(req,res,email,emailToken)

         res.redirect('/')
     } catch(err){
         console.log(err)
     }
}

exports.login = async (req,res) => {
    email = req.body.email
    password = req.body.password
    const user  = await User.findOne({email: email})
    if(user){
        const match = await  bcrypt.compare(password, user.password)
        if(match){
           user.isAdmin ?  res.render('home-admin', {user:user}) : res.render('home-client', {user:user})
        } else{
            res.redirect('/')
        }
    } else{
        res.send('test')
    }
}

exports.verify = async (req,res) => {
    try{
        const token = req.query.token
        const user = await User.findOne({emailToken: token})
        if(user){
            user.emailToken = null
            user.isVerified = true
            await user.save()
            res.send('success')
        } else{
            res.send('bad')
        }
    } catch(err){
        console.log(err);
    }
}