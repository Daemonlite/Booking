
const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const {errorHandler} = require('./middlewares/errorMiddleware')
const connectDb = require('./config/db')

const port = process.env.PORT
const app = express() 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
connectDb()

app.use(errorHandler)

app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/hotel',require('./routes/hotelRoutes'))
app.use('/api/book',require('./routes/bookingsRoutes'))

app.listen(port, () => console.log(`server running on port ${port}`))

