import { json } from 'express'
import asyncHandler from 'express-async-handler'
import jwt from "jsonwebtoken"
import User from '../Model/UserModel.js'
import investor from '../Model/UserInvestmentModel.js'
import generateToken from '../Util/generateToken.js'
import sendEmail from '../Util/SendEmail.js'

//signUp controller
const signUpHandler = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, image, password,referral,wallet } = req.body
    
    //checking if any of the form inputs is empty
    if (!firstname || !lastname || !email || !image || !password) {
        res.status(400)
        throw new Error("please fill out the form properly")
    }

    //checking if user already exists
    const userExist =await User.findOne({email})
    if (userExist) {
        res.status(400)
        throw new Error(`user with ${email} already exist`)
    }

    //if user is unique
    const user = await User.create({
        firstname,
        lastname,
        email,
        password,
        image,
        referredBy: referral,
        wallet
    })
    if (user) {
        res.status(201).json({message:"registered successfully, please login with your details"})
    }
})



//signIn controller
const signInHandler = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //checking if form was submitted with empty values
    if (!email || !password) {
        res.status(400)
        throw new Error("please fill out the form properly")
    }

    //checking if user exist in database and password matches
    const userExist = await User.findOne({ email })
    if (userExist && (await userExist.matchPassword(password))) {
        res.status(200).json({
            _id: userExist._id,
            firstname: userExist.firstname,
            lastname: userExist.lastname,
            email: userExist.email,
            image: userExist.image,
            isAdmin: userExist.isAdmin,
            intel: userExist.intel,
            referal:userExist.referal,
            token:generateToken(userExist._id)
        })
    } else {
        res.status(401)
        throw new Error("invalid email address or password")
    }
    
})

const fetchUserProfile = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(400)
            throw new Error("no user")
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})
const updateUserProfile = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { firstname, lastname, email, password } = req.body
    try {
        const user = await User.findById(req.params.id)
        if (user) {
           
            user.email = email || user.email
            user.firstname = firstname || user.firstname
            user.lastname = lastname || user.lastname
            if (password) {
                user.password = password
           }
            const updatedUser = await user.save()
            res.status(201).json({ message: "profile updated successfully" })
        }
    }catch(error){}
})

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    if (!email) {
        res.status(404)
        throw new Error("please provide your email")
    }
   try {
        const user = await User.findOne({email})
        if (!user) {
            res.status(404)
            throw new Error("email could not be sent, please register")
        }
        const resetToken = user.generateResetToken(user._id)
       await user.save()
       const resetUrl = `http://intelwave.adaptable.app/resetpassword/${resetToken}`
       const message = `
       <h1> you have requested a password reset</h1>
       <p>please go to this link to reset your password,Link is valid for 15 minutes</p>
       <a href =${resetUrl}>${resetUrl}</a>
       `
       try {
           sendEmail({ to: email, subject: "password reset", text: message })
           res.status(201).json({message:"password reset link sent, please check your inbox or spam folder"})

       } catch (error) {
           user.resetPasswordToken = undefined
           user.resetPasswordExpire = undefined
           await user.save()
           res.status(400)
           throw new Error(error.message)
       }
   } catch (error) {
       res.status(500)
       throw new Error(error.message)
   }
})
//password reset
const resetPasswordContoller = asyncHandler(async (req, res) => {
    const id = req.params.id
    const { password } = req.body
    if (!password) {
        res.status(400)
        throw new Error("please provide password")
    }
    const  decoded = jwt.verify(id, process.env.JWT_SECRET)
    // console.log(decoded)
   
    try {
        const user = await User.findOne({
            resetPasswordToken: decoded.id,
            resetPasswordExpire:{$gt:Date.now()}
        })
         console.log(user)
        if (!user) {
            res.status(400)
            throw new Error("invalid reset token")
        }
        user.password = password
        user.resetPasswordToken = undefined
       user. resetPasswordExpire = undefined
        await user.save()
        res.status(201).json({ message: "password changed successfully,welcome back!" });
    } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error(error.message);
    }
})
const fetchPaystackPublicKey = asyncHandler(async (req, res) => {
    try {
        const user = req.user._id
        if (user) {
            res.status(200).json(process.env.PAYSTACK_PUBLIC_KEY)
        } else {
            res.status(400)
            throw new Error("aunthorised")
        }
    } catch (error) {
        res.status(404)
        throw new Error(error.message)
    }
})
const fetchPaystackPublicKeyPublic = asyncHandler(async (req, res) => {
    try {
        res.status(200).json(process.env.PAYSTACK_PUBLIC_KEY)
    } catch (error) {
        res.status(404)
        throw new Error(error.message)
    }
})

const updateCoinTotal = asyncHandler(async (req, res) => {
    const { coin } = req.body
    console.log("coin",coin)
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            user.intel = +user.intel + parseFloat(coin)

            const updatedUser = await user.save()
             res.status(201).json({message:"sent"})
        }
       
    } catch (error) {
        res.status(404)
        throw new Error(error.message)
    }
})
const fetchCoin = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user) {
           
             res.status(201).json(user.intel)
        }
       
    } catch (error) {
        res.status(404)
        throw new Error(error.message)
    }
})
export{signUpHandler,signInHandler,fetchUserProfile,updateUserProfile,fetchPaystackPublicKey,forgotPassword,resetPasswordContoller,updateCoinTotal,fetchCoin,fetchPaystackPublicKeyPublic}