import asyncHandler from "express-async-handler"
import priceModel from "../Model/PricesModel.js"

const fetchPriceHandler = asyncHandler(async (req, res) => {
    try {
        const prices = await priceModel.find({})
        res.status(201).json(prices)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const updatePriceHandler = asyncHandler(async (req, res) => {
    const {
        usdtPrice1, usdtPrice2, intelPrice, rate, tick, min1Usdt,
        max1Usdt, min2Usdt, max2Usdt } = req.body
    try {
        const prices = await priceModel.findById(req.params.id)
        
        if (prices) {
            prices.usdtPrice1 = parseFloat(usdtPrice1) || prices.usdtPrice1,
            prices.usdtPrice2 = parseFloat(usdtPrice2) || prices.usdtPrice2,
            prices.intelPrice = parseFloat(intelPrice) || prices.intelPrice,
            prices.rate = parseFloat(rate) || prices.rate
            prices.min1Usdt = parseFloat(min1Usdt) || prices.min1Usdt;
            prices.max1Usdt = parseFloat(max1Usdt) || prices.max1Usdt;
            prices.min2Usdt = parseFloat(min2Usdt) || prices.min2Usdt;
            prices.max2Usdt = parseFloat(max2Usdt) || prices.max3Usdt;
            prices.tick = tick || prices.tick
        }
        await prices.save()
        res.status(201).json("Price updated!")
        if (!prices) {
            res.status(404)
            throw new Error("error")
        }
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})
export {fetchPriceHandler,updatePriceHandler}