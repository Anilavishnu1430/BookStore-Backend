//1 import express
const express = require('express')
//4 import userController
const bookController = require('../Controllers/bookController')

const jwtMiddleware = require('../middlewares/jwtMiddleware')
const adminJwtMiddleware = require('../middlewares/adminJwtMiddleware')

const multerMiddleware = require('../middlewares/multerMiddleware')

//2 Route define
const bookRoute = express.Router()

//5 AddBook - endpoints define
bookRoute.post('/api/addBook',jwtMiddleware,multerMiddleware.array('uploadedImages',3),bookController.addBook)

//View Book
bookRoute.get('/api/viewBooks',jwtMiddleware,bookController.viewBooks)

//Home Book
bookRoute.get('/api/homeBooks',bookController.homeBooks)

//Get a Book
bookRoute.get('/api/getABook/:id',jwtMiddleware,bookController.getABook)

//Get all Book
bookRoute.get('/api/getAllBooks',adminJwtMiddleware,bookController.getAllBooks)

//Delete a Book
bookRoute.delete('/api/deleteABook/:id',adminJwtMiddleware,bookController.deleteABook)

//Approve a Book
bookRoute.put('/api/approveABook/:id',adminJwtMiddleware,bookController.approveABook)

//Reject a Book
bookRoute.put('/api/rejectABook/:id',adminJwtMiddleware,bookController.rejectABook)

//Make Payment
bookRoute.put('/api/makepayment',jwtMiddleware,bookController.makePayment)

//3 export route
module.exports = bookRoute