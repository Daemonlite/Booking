const express = require('express')
const router= express.Router()

const {getHotels,hotel,updateHotel,deleteHotel} = require('../controllers/hotelsController')

router.get('/',getHotels)
router.post('/',hotel)
router.put('/:id',updateHotel)
router.delete('/:id',deleteHotel)


module.exports = router