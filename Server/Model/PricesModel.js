import mongoose from "mongoose";

const priceSchema = mongoose.Schema({
    usdtPrice1:{
        type: Number,
        required: true,
        default:630
    },
    min1Usdt: {
        type: Number,
        required: true,
        default:100
    },
    max1Usdt: {
        type: Number,
        required: true,
        default:400
    },
    min2Usdt: {
        type: Number,
        required: true,
        default:500
    },
    max2Usdt: {
        type: Number,
        required: true,
        default:1000
    },
    usdtPrice2:{
        type: Number,
        required: true,
        default:610
    },
    intelPrice:{
        type: Number,
        required: true,
        default:0.1102
    },
    rate:{
        type: Number,
        required: true,
        default:0
    },
    tick:{
        type: String,
        required: true,
        default:"up"
    },

}, {
    timestamps:true
})

const priceModel = mongoose.model("prices", priceSchema)
export default priceModel