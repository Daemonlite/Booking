const express = require('express')
const router= express.Router()
const {registerUser,loginUser,logout} = require('../controllers/userController')

router.post('/',registerUser)
router.post('/login',loginUser)
router.delete('/logout',logout)



module.exports = router