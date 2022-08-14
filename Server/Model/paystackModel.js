import mongoose from "mongoose"

const paystackSchema = mongoose.Schema({
    Amount: {
        type: String,
        required:true
    },
    payment_status: {
        type: String,
        required:true
    },
    payment_reference: {
        type: String,
        required:true
    },
    adminApproved: {
        type: Boolean,
        required: true,
        default:false
    },
    status: {
        type: String,
        required: true,
        default:"pending"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
         ref: "User",
    },
    paymentMethod: {
        type: String,
        required: true,
        default:"Paystack"
    }
},
    {
         timestamps: true
    }
)
const Paystack = mongoose.model("paystack", paystackSchema)
export default Paystack