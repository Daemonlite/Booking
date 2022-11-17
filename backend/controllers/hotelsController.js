const Hotel = require('../models/hotelsModel')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const getHotels= asyncHandler( async (req,res)=>{
  const hotels = await Hotel.find({hotel:Hotel})
  res.status(200).json(hotels)
})


const hotel = asyncHandler( async (req,res) => {
    const {hotelName,location,price} = req.body


    if(!hotelName)return res.status(400).send('Name is required')
    if(!location   )return res.status(400)
    .send('location is required ')
    if(!price)return res.status(400).send('price  is required')

    const exists = await Hotel.findOne({hotelName})
    if(exists)return res.status(400).send('hotel already  exists')

    const motel = new Hotel({hotelName,location,price})

    if(motel){
     res.status(200).json('hotel created successfully')
    }
    else{
     res.status(400).json('bad not created')
    }
 
    try{
   await motel.save()
   return res.json({
     ok:true,
   })
 
    } catch(err){
     console.log('failed=>',err)
     return res.status(400).send('error try again')
    }
})

const updateHotel = asyncHandler(  async (req,res,next)=>{
  const upHotel = new Hotel({
    _id: req.params.id,
    hotelName:req.body.hotelName,
    location:req.body.location,
    price:req.body.price
  });
 Hotel.findByIdAndUpdate({_id: req.params.id}, upHotel).then(
    () => {
      res.status(201).json({
        message: 'Hotel updated successfully!'
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

const deleteHotel = asyncHandler( async (req,res) => {
  Hotel.deleteOne({_id: req.params.id}).then(
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

} )
    

module.exports = {
        getHotels,
        hotel,
        updateHotel,
        deleteHotel,
        
    }