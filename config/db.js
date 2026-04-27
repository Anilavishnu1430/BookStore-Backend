const mongoose = require('mongoose')

mongoose.connect(process.env.connectionString).then(res=>{
    console.log("Connection Established..");
})
.catch(err=>{
    console.log("MonogoDB Error",err);
})