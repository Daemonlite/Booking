const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    hotelName:{
        type:String,
        required:true,
    },
    roomType:{
        type:String,
        required:true,
    },

    arrival:{
        type:String,
        required:true,
    },
    departure:{
        type:String,
        required:true,
    },

},{
    timestamps:true,
})

module.exports = mongoose.model('Booking',bookingSchema)