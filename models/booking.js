const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    startTime:{
        type: String
    },
    endTime:{
        type: String
    },
    date:{
        type: String
    },
    stadiumName:{
        type: String
    },
    qrCode:{
        type: String
    }
})

module.exports = mongoose.model('booking', bookingSchema)