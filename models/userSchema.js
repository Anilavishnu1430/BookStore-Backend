const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: "Bookstore User"
    },
    role: {
        type: String,
        default: "user"
    }
})

module.exports = mongoose.model("User", userSchema)