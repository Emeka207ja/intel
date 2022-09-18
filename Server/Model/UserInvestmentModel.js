import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const InvestmentUserModel = mongoose.Schema({
    name: {
        type: "String",
        required: true
    },
    email: {
        type: "String",
        required:true
    },
    password: {
        type: "String",
        required: true
    },
    wallet: {
        type: "String",
        required: true
    }
},
    { timestamps: true })

    InvestmentUserModel.pre("save", async function (next) {
        if (!this.isModified('password')) {
            next()
        }
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt)
    })
const investor = mongoose.model("Investors", InvestmentUserModel)
export default investor