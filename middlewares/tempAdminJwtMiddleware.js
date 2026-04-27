const jwt = require('jsonwebtoken')

const adminJwtMiddleware = (req,res,next) =>{
    console.log("Inside JWT");  
    try{
        const token =  req.headers.authorization.slice(7)
        console.log(token);
        jwtverification = jwt.verify(token,process.env.jwtKey)
        console.log(jwtverification);
        req.payload = jwtverification.userMail

        if(jwtverification.userMail=="admin@gmail.com"){
            next()
        }else{
            res.status(401).json("Unauthorised user!!!")
        }
    }
    catch(err){
        res.status(401).json("Authorization error...")
    }
}

module.exports = adminJwtMiddleware