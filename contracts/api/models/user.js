const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    videos: [
        {
            videocid: {
                type: String,
            },
            thumbnailcid: {
                type: String,
                trim: true,
            },
            duration: {
                type: String,
                trim: true,
            },
            title: {
                type: String,
                trim: true,
            },
            description: {
                type: String,
                trim: true,
            },
            created: {
                type: Date,
                default: Date.now,
            },
            filename: {
                type: String,
            },
        },
    ],
    user: {
        walletaddress: {
            type: String,
            trim: true,
        },
        name: {
            type: String,
            trim: true,
        },
        profileid: {
            type: String,
        },
    },
})

module.exports = mongoose.model("User", UserSchema)
