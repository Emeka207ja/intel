import asyncHandler from "express-async-handler"
import User from "../Model/UserModel.js"
import Payment from "../Model/paymentModel.js"
 import Paystack from "../Model/paystackModel.js"

 // @DESC Submit proof of payment
// @ROUTE POST /api/payment
// @ACCESS private
const paymentHandler = asyncHandler(async (req, res) => {
    
    const { wallet, image } = req.body
    if (!wallet || !image) {
        res.status(400)
        throw new Error("please fill out all fields")
    }
    console.log(req.user)
    const paid = await Payment.create({
        user:req.user._id,
        wallet: wallet,
        image:image
    })
    if (paid) {
        res.status(201).json({message:"payment details submitted successfully"})
    }
})

// @DESC Fetch payment Info for a user
// @ROUTE GET /api/payment/proof
// @ACCESS private

const fetchUserPayment = asyncHandler(async (req, res) => {
    const proof = await Payment.find({ user: req.user._id})
    if (proof) {
        res.status(200).json(proof)
    } else {
        res.status(400)
        throw new Error("no user")
    }
})
const sendPaystackPayment = asyncHandler(async(req,res) => {
    const { status, reference, amount } = req.body
   
    try {
        const payment = await Paystack.create({
            Amount: amount,
            payment_reference: reference,
            payment_status: status,
            user:req.user._id
        })
        if (payment) {
            res.status(201).json({ message: "payment successful" })
        }
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
        console.log(error.message)
    }
})
// fetch the payment status of a client for admin
const fetchClientsPayments = asyncHandler(async (req, res) => {
    try {
        const user = await Paystack.find({}).populate({ path: "user", model: User }).sort({updatedAt:-1}) 
         if (!user) {
            res.status(404)
            throw new Error("not found")
        }
        res.status(200).json(user)
    } catch (error) {
         res.status(500)
        throw new Error(error.message)
    }
})
// fetch the payment status of a client for user
const fetchClientPayment = asyncHandler(async (req, res) => {
    try {
        const user = await Paystack.find({user: req.user._id}).sort({updatedAt:-1})
        if (!user) {
            res.status(406)
            throw new Error("not accepted")
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})
 export{paymentHandler, fetchUserPayment,sendPaystackPayment,fetchClientPayment,fetchClientsPayments}