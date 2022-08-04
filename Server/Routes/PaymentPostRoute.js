import express from 'express'
import { fetchUserPayment, paymentHandler, sendPaystackPayment } from '../Controller/PaymentPostController.js'
import {protect} from '../Util/protected.js'
const router = express.Router()

router.route("/").post(protect,paymentHandler)
router.route("/proof").get(protect, fetchUserPayment)

router.route("/paystack").post(protect,sendPaystackPayment)
export default router