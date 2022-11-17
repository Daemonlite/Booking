const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Booking = require('../models/booking')

const getBookings= asyncHandler( async (req,res)=>{
    const bookings = await Booking.find({booking:Booking})
    res.status(200).json(bookings)
  })



const booking = asyncHandler( async (req,res) => {
  const {Name,email,phone,hotelName,roomType,
  arrival,departure} = req.body


   if (!Name)return res.status(400).send('Name is required')
   if(!email) return res.status(400).send('email is required')
   if(!phone || phone.length < 10 )return res.status(400).send('phone number required and should be ten numbers')
   if(!hotelName)return res.status(400).send('Hotel name is required')
   if(!roomType)return res.status(400).send('Room typeis required')
   if(!arrival)return res.status(400).send('arrival date is required')
   if(!departure)return res.status(400).send('date of departure is required')
  

    const exists = await Booking.findOne({Name})
    if(exists)return res.status(400).send('hotel already  exists')

    const Bookings = new Booking({Name,email,phone,hotelName,roomType,arrival,departure})

    if(Bookings){
     res.status(200).json('Booking created successfully')
    }
    else{
     res.status(400).json('bad not created')
    }
 
    try{
   await Bookings.save()
   return res.json({
     ok:true,
   })
 
    } catch(err){
     console.log('failed=>',err)
     return res.status(400).send('error try again')
    }
}) 

const updateBooking = asyncHandler(async (req,res) => {
  const upBooking = new Booking({
    _id: req.params.id,
    Name:req.body.Name,
    email:req.body.email,
    phone:req.body.phone,
    hotelName:req.body.hotelName,
    roomType:req.body.roomType,
    arrival:req.body.arrival,
    departure:req.body.departure,

  });
 Booking.findByIdAndUpdate({_id: req.params.id}, upBooking).then(
    () => {
      res.status(201).json({
        message: 'Booking updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
})

const deleteBooking = asyncHandler(async (req,res)=>{
  Booking.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
})

module.exports = {
    getBookings,
    booking,
    updateBooking,
    deleteBooking,
}