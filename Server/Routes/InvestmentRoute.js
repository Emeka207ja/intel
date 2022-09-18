import express from 'express'
import { investorProtect } from '../Util/protected.js'
import {investorSignup,investmentInfo} from "../Controller/InvestorControler.js"
const router = express.Router()

router.route("/invest").post(investorSignup)
router.route("/investinfo").post(investorProtect, investmentInfo)

export default router