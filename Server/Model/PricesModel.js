import mongoose from "mongoose";

const priceSchema = mongoose.Schema({
    usdtPrice1:{
        type: Number,
        required: true,
        default:630
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

}, {
    timestamps:true
})

const priceModel = mongoose.model("prices", priceSchema)
export default priceModel