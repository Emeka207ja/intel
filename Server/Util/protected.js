import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler'
import User from "../Model/UserModel.js";
// import { InvestmentDetails } from "../Model/InvestmentDetailsModel.js";
import investor from "../Model/UserInvestmentModel.js"

const protect = asyncHandler(async (req, res, next) => {
    let token 
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
       
        try {
            token = req.headers.authorization.split(' ')[1]
           const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user =await User.findById(decoded.id).select("-password")
            next()
       } catch (error) {
            res.status(400)
            throw new Error("unauthorised")
       }
    }
    if (!token) {
        res.status(401)
        throw new Error("unathorised")
    }
})

const investorProtect = asyncHandler(async (req, res, next) => {
    let token 
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
       
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            req.user = await investor.findById(decoded.id)
            console.log(req.user)
            next()
       } catch (error) {
            res.status(400)
            throw new Error("unauthorised")
       }
    }
    if (!token) {
        res.status(401)
        throw new Error("unathorised")
    }
})
export { protect,investorProtect}