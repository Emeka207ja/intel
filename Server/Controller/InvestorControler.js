import investor from '../Model/UserInvestmentModel.js'
import generateToken from '../Util/generateToken.js'
import asyncHandler from 'express-async-handler'


const investorSignup = asyncHandler(async (req, res) => {
    console.log(req.bod)
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
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            wallet: user.wallet,
           
            token:generateToken(user._id)
        })
    }
})
export {investorSignup}