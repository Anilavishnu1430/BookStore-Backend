require('dotenv').config()
const express = require('express')
require('./config/db')

const cors = require('cors')
const userRoute = require('./router/userRoute')
const bookRoute = require('./router/bookRoute')

const bookStoreServer = express()

bookStoreServer.use(cors())
bookStoreServer.use(express.json())
bookStoreServer.use(userRoute)
bookStoreServer.use(bookRoute)
bookStoreServer.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

bookStoreServer.get('/',(req,res)=>{
    res.send("Book Store server Satrted...")
})

bookStoreServer.listen(3000,()=>{
    console.log("Book Store Server running on the port "+PORT);
    
})