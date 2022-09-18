import mongoose from "mongoose"

const InvestmentDetailsSchema = mongoose.Schema({
  
    wallet: {
        type: String,
        required:true
    },
    status: {
        type: Boolean,
        required: true,
        default:false
    },
    pack: {
        type: String,
        required:true
    },
    amount: {
        type: String,
        required:true
    },
    image: {
        type: String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "investor",
    }
}, {
    timestamps:true
})
export const InvestmentDetails = mongoose.model("investmentDetails",InvestmentDetailsSchema)