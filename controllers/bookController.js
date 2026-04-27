const books = require('../models/bookModel')
const Stripe = require('stripe')(process.env.stripeKey);

//Add Book POST
exports.addBook=async(req,res)=>{
    console.log("Inside the Book");
    console.log(req.body);
    console.log(req.files);
    const { title,author,noofpages,imageUrl,price,dprice,abstract,publisher,language,isbn,category} =req.body
    const userMail = req.payload
    const uploadedImages = []
    req.files.map(item=>uploadedImages.push(item.filename))
    
    console.log(title,author,noofpages,imageUrl,price,dprice,abstract,publisher,language,isbn,category,userMail,uploadedImages);
    
    const existingBook = await books.findOne({title,userMail})
    if(existingBook){
        res.status(401).json({message:"book already existing..."})
    }
    else{
        const newBook = books({
            title,author,noofpages,imageUrl,price,dprice,abstract,publisher,language,isbn,category,userMail,uploadedImages
        })
        await newBook.save()
        res.status(200).json({message:"book added successfully...",newBook})
    }
}

//View Books - GET
exports.viewBooks=async(req,res)=>{
    console.log("Inside View Book");
    console.log(req.query);//{ search: 'The 48 Laws of Power' }
    searchKey = req.query.search
    
    try{
        const query = {
            title:{
                $regex:searchKey,
                $options:"i"
            }
        }
        const viewBook = await books.find(query)
        res.status(200).json({message:"All books fetched",viewBook})
    }
    catch(err){
        res.status(500).json({message:"Server err",err})
    }
}

//home Books - GET
exports.homeBooks=async(req,res)=>{
    console.log("Inside the Book");
    try{
        const homeBook = await books.find().sort({_id:-1}).limit(4)
        res.status(200).json({message:"books fetched",homeBook})
    }
    catch(err){
        res.status(500).json({message:"Server err",err})
    }
}

//Get a Book - GET
exports.getABook=async(req,res)=>{
    console.log("Inside get a Book");
    const {id}=req.params
    try{
        const book = await books.findOne({_id:id})
        res.status(200).json({message:"book fetched",book})
    }
    catch(err){
        res.status(500).json({message:"Server err",err})
    }
}

//Get all Book - GET
exports.getAllBooks=async(req,res)=>{
    console.log("Inside get all Books");
    try{
        const allbook = await books.find()
        res.status(200).json({message:"book fetched",allbook})
    }
    catch(err){
        res.status(500).json({message:"Server err",err})
    }
}

//Delete a Book 
exports.deleteABook=async(req,res)=>{
    console.log("Inside get a Book");
    const {id}=req.params
    try{
        const book = await books.deleteOne({_id:id})
        res.status(200).json({message:"book deleted",book})
    }
    catch(err){
        res.status(500).json({message:"Server err",err})
    }
}

//Approve a Book 
exports.approveABook=async(req,res)=>{
    console.log("Inside get a Book");
    const {id}=req.params
    try{
        const book = await books.findOne({_id:id})
        if(!book){
            res.status(404).json({message:"Book Not Found"})
        }
        book.status = "Approved"
        await book.save()
        res.status(200).json({message:"book updated",book})
    }
    catch(err){
        res.status(500).json({message:"Server err",err})
    }
}

//Reject a Book 
exports.rejectABook=async(req,res)=>{
    console.log("Inside get a Book");
    const {id}=req.params
    try{
        const book = await books.findOne({_id:id})
        if(!book){
            res.status(404).json({message:"Book Not Found"})
        }
        book.status = "Rejected"
        await book.save()
        res.status(200).json({message:"book updated",book})
    }
    catch(err){
        res.status(500).json({message:"Server err",err})
    }
}

exports.makePayment=async(req,res)=>{
    console.log("Inside Payment");
    const email=req.payload
    const {bookDetails}=req.body
    try{
        const bookPayment = await books.findByIdAndUpdate(bookDetails.id,{
                        title:bookDetails.title,
                        author:bookDetails.author,
                        noofpages:bookDetails.noofpages,
                        imageUrl:bookDetails.imageUrl,
                        price:bookDetails.price,
                        dprice:bookDetails.dprice,
                        abstract:bookDetails.abstract,
                        publisher:bookDetails.publisher,
                        language:bookDetails.language,
                        isbn:bookDetails.isbn,
                        category:bookDetails.category,
                        userMail:bookDetails.userMail,
                        uploadedImages:bookDetails.uploadedImages,
                        status:"Sold",
                        brought:email

        },{new :true})

        const line_items = [
        {
            price_data: {
            currency: "usd",
            product_data: {
                name: bookDetails.title,
                description: `${bookDetails.author} | ${bookDetails.publisher}`,
                images: [bookDetails.imageUrl],
                metadata: {
                title: bookDetails.title,
                author: bookDetails.author,
                noofpages: bookDetails.noofpages,
                imageUrl: bookDetails.imageUrl,
                price: bookDetails.price,
                dprice: bookDetails.dprice,
                abstract: bookDetails.abstract,
                publisher: bookDetails.publisher,
                language: bookDetails.language,
                isbn: bookDetails.isbn,
                category: bookDetails.category,
                uploadedImages: bookDetails.uploadedImages,
                status: "Sold",
                userMail: bookDetails.userMail,
                brought: email,
                },
            },
            unit_amount: Math.round(Number(bookDetails.dprice) * 100),
            },
            quantity: 1,
        },
        ];
        const session = await Stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        success_url: "http://localhost:5173/payment-success",
        cancel_url: "http://localhost:5173/payment-error",
        line_items,
        mode: "payment",
        });
        console.log(session)

        res.status(200).json({message:"book updated",session})
    }
    catch(err){
        res.status(500).json({message:"Server err",err})
    }
}