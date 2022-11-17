const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password} = req.body
    
    if(!name || !email  || !password){
        res.status(400).send('Please add all fields')
    }
    
    //check if user exists
    const userExists = await User.findOne({email})
    
    if (userExists){
        res.status(400).send('user already exists') 
    
    }
    
    //hashpassord
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt )
    
    //createUser
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
    
    })
    
    if(user){
       res.status(201).json({
        _id : user.id,
        name :user.name,
        email : user.email,
     
       })}else{
          res.status(400)
          throw new Error('invalid user credentials')
       }
    
    
     
    })

    //login user

    const loginUser =  async(req,res) => {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if (user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id : user.id,
            name :user.name,
            email : user.email,
           
        })
        }else{
            res.status(400)
            throw new Error('invalid user credentials')
        }
    
        res.json({message:"login user"})
       }

       // log users out

       const logout = (req,res) => {
        if (req.session) {
            req.session.destroy(err => {
              if (err) {
                res.status(400).send('Unable to log out')
              } else {
                res.send('Logout successful')
              }
            });
          } else {
            res.end()
          }
        }
       
    module.exports = {
        registerUser,
        loginUser,
        logout,
    }