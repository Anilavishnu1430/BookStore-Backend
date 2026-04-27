//1 import express
const express = require('express')
//4 import userController
const userController = require('../controllers/userController')

const jwtMiddleware = require('../middlewares/jwtMiddleware')
const adminJwtMiddleware = require('../middlewares/adminJwtMiddleware')

const multerMiddleware = require('../middlewares/multerMiddleware')

//2 Route define
const userRoute = express.Router()

//5 RegisterAPI - endpoints define
userRoute.post('/api/register',userController.registerUser)
//LoginAPI - endpoints define
userRoute.post('/api/login',userController.LoginUser)
//GoogleLoginAPI - endpoints define
userRoute.post('/api/googleLogin',userController.googleLoginUser)

//User Profile Updation - endpoints define
userRoute.put('/api/updateProfile/:id',jwtMiddleware,multerMiddleware.single('profile'),userController.updateUserProfile)

//Get all Users
userRoute.get('/api/getAllUsers',adminJwtMiddleware,userController.getAllUsers)


//3 export route
module.exports = userRoute