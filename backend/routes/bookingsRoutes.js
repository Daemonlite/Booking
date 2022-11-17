const express = require('express')
const router= express.Router()
const {getBookings,booking,updateBooking,deleteBooking} = require('../controllers/hotelBookingControllers')

router.get('/',getBookings)
router.post('/',booking)
router.put('/:id',updateBooking)
router.delete('/:id',deleteBooking)

module.exports = router