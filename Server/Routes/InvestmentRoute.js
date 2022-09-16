import express from 'express'
const router = express.Router()

import {investorSignup} from "../Controller/InvestorControler.js"

router.route("/invest").post(investorSignup)

export default router