const mongoose = require('mongoose')
const QRCode = require('qrcode')

const User = require('../models/user')
const Stadium = require('../models/stadium')
const booking = require('../models/booking')
const Mail = require('../controllers/utilis')
const { GridFsStorage } = require('multer-gridfs-storage')


exports.show = async (req,res) => {
    const email = req.params.email
    const user = await User.findOne({email: email})
    res.render('add-stadium', { user:user })     
}

exports.add = async (req,res) => {
    try {
        const name = req.body.name
            const ownerName = req.body.ownerName
            const contact = req.body.telephone
            const email = req.body.email
            const capacity = req.body.capacity
            const address = req.body.address
            const latitude = req.body.latitude
            const longitude = req.body.longitude
        
            const  stadium = new Stadium({
                name: name,
                ownerName: ownerName,
                contactNumber: contact,
                email: email,
                capacity: capacity,
                address: address,
                images: [],
                latitude: latitude,
                longitude: longitude
            })
            await stadium.save()
            res.render('add-image',{stadium: stadium})
    } catch(err){
        console.log(err)
    }
}

exports.book = async (req,res) => {
    const { name,email,startTime,endTime,date,stadiumName } = req.body
    let mail = req.body.email
    console.log( name,email,startTime,endTime,date)
    const bookings = new booking({
        name,
        email,
        startTime,
        endTime,
        date,
        stadiumName
    })

   
    let stringdata = JSON.stringify(bookings)
    QRCode.toDataURL(stringdata, async function (err, url) {
        if(err) return console.log("error occured")
        //console.log(url)
        bookings.qrCode = url
        await bookings.save()
        Mail.sendConfirmation(url,mail)
        res.render('confirm-page', { url: url, bookings: bookings } )
    })
}

exports.slots = async (req,res) => {
    const name = req.params.name
    const booked = await booking.find({ stadiumName: name })
    //console.log(booked)
    res.send(booked)
}



exports.myStadiumSlots = async (req,res) => {
    const name = req.params.name
    const booked = await booking.find({ stadiumName: name })
    //console.log(booked)
    //res.send(booked)
    res.render('my-stadium-slots', {booked: booked, name: name} )
}

exports.details = async (req,res) => {
    const time = req.params.time
    const details = await booking.findOne({startTime: time})
    res.send(details)
}


