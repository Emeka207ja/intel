import investor from '../Model/UserInvestmentModel.js'
import generateToken from '../Util/generateToken.js'
import asyncHandler from 'express-async-handler'
import { InvestmentDetails } from '../Model/InvestmentDetailsModel.js'


const investorSignup = asyncHandler(async (req, res) => {
    const { name, email, password,wallet } = req.body
  
    if ( !name || !email  || !password) {
        res.status(400)
        throw new Error("please fill out the form properly")
    }

    const userExist = await investor.findOne({email})
    if (userExist) {
        res.status(400)
        throw new Error(`user with ${email} already exist`)
    }

    const user = await investor.create({
        name,
        email,
        password,
        wallet
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            wallet: user.wallet,
           
            token:generateToken(user._id)
        })
    }
})

const investmentInfo = asyncHandler(async (req, res) => {
    const { wallet, pack, amount, image } = req.body
    console.log(req.user)
    try {
        if (!wallet || !pack || !amount || !image) {
            res.status(404);
            throw new Error("Fill all fields!")
        }
        const invest = await InvestmentDetails.create({
            wallet,
            pack,
            amount,
            image,
            user:req.user._id
        })
        res.status(201).json({message:"Investments Details sent!"})
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
})
export {investorSignup,investmentInfo}