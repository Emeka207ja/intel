import mongoose from "mongoose"

const StakingSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        default:5000
    },
    duration: {
        type: String,
        required: true,
        default:30
    },
    rate: {
        type: String,
        reqiured: true,
        default:5
    },
     user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
         ref: "User",
    }
},
{timestamps:true}
)
const StakingModel = mongoose.model("staking", StakingSchema)
export default StakingModel