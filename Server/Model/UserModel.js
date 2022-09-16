import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import crypto from 'crypto-js'
import jwt from 'jsonwebtoken'

const userModel = mongoose.Schema({
    firstname: {
        type: String,
        required: [true,"firstname required"],
        trim:true
    },
    lastname: {
        type: String,
        required: [true,"lastname required"],
         trim:true
    },
    password: {
        type: String,
        required:[true,"password required"]
    },
    resetPasswordToken: String,
    resetPasswordExpire:Date,
    email: {
        type: String,
        required: [true,"email required"],
        unique: [true,"email must be unique"],
        match:[/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"please input a valid email"]
    },
    image: {
        type: String,
        required:[true,"image required"]
    },
    isAdmin: {
        type: Boolean,
        required:true,
        default: false
    },
    intel: {
        type: Number,
        required: true,
        default:0
    },
    referal: {
        type: Number,
        required: true,
        default:0
    },
    referredBy: {
        type: String,
        // required: true,
        default:"intelwaveTeam"
    },
    wallet: {
        type: String,
        // required: true,
        default:"intelwaveWallet"
    }
   
}, {
    timestamps:true
})

//decoding hashed password for a match
userModel.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}
userModel.methods.generateResetToken = function (id) {

    const resetToken = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15min' })
    const token =jwt.verify(resetToken, process.env.JWT_SECRET)
    this.resetPasswordToken =token.id
    this.resetPasswordExpire = Date.now() + 15*(60*1000)
    return resetToken
}
// hashing users password
userModel.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt =await bcrypt.genSalt(10)
    this.password =await bcrypt.hash(this.password,salt)
})
const User = mongoose.model("user", userModel)
export default User