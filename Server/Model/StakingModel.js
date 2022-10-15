import mongoose from "mongoose"

const StakingSchema = mongoose.Schema({
    amount: {
        type: Number,
    },
    duration: {
        type: String,
    },
    rate: {
        type: String,
    },
     user: {
        type: mongoose.Schema.Types.ObjectId,
         ref: "User",
    }
},
{timestamps:true}
)
const StakingModel = mongoose.model("staking", StakingSchema)
export default StakingModel