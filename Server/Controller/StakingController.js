import StakingModel from "../Model/StakingModel.js";
import User from "../Model/UserModel.js"
import asyncHandler from "express-async-handler"

const stakingController = asyncHandler(async (req, res) => {
    const { amount, selected, rate } = req.body
    const id = req.params.id
    try {
        if (!amount || !selected || !rate) {
            res.status(404)
            throw new Error("invalid details submitted")
        }
        const user = await User.findById(id)
        if (!user) {
            res.status(404)
            throw new Error("no user found")
        }
        user.intel = (user.intel - amount).toFixed(2)
        await user.save()
        const stake = await StakingModel.create({
            amount,
            duration: selected,
            rate,
            user:req.user._id
        })
        await stake.save()
        res.status(201).json({message: "stake placed!"})
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
   }

})

const fetchAllStakes = asyncHandler(async (req, res) => {
    try {
        const stakes = await StakingModel.find({}).populate({path:"user",model:User})
        if (!stakes) {
            res.status(200).json({message:"no stake available"})
        }
        res.status(200).json(stakes)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const fetchSingleStake = asyncHandler(async (req, res) => {
    try {
        const stake = await StakingModel.find({user:req.user._id})
        if (!stake) {
            res.status(404)
            throw new Error("stake does not exist")
        }
        res.status(200).json(stake)

    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

export {
    stakingController,fetchAllStakes,fetchSingleStake
}