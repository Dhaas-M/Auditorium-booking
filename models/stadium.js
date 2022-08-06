const mongoose = require('mongoose')

const stadiumSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    ownerName:{
        type: String,
        required: true
    },
    contactNumber:{
        type: String
    },
    email:{
        type: String
    },
    capacity:{
        type: Number
    },
    address:{
        type: String
    },
    images:{
        type: Array
    },
    latitude:{
        type: Number
    },
    longitude:{
        type: Number
    }
})


module.exports = mongoose.model('Stadium', stadiumSchema)