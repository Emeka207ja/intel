import express from 'express'
import { fetchClientPayment, fetchClientsPayments, fetchUserPayment, paymentHandler, sendPaystackPayment } from '../Controller/PaymentPostController.js'
import {protect} from '../Util/protected.js'
const router = express.Router()

router.route("/").post(protect,paymentHandler)
router.route("/proof").get(protect, fetchUserPayment)

router.route("/paystack").post(protect,sendPaystackPayment)
router.route("/paystack").get(protect,fetchClientPayment)
router.route("/paystack/admin").get(protect,fetchClientsPayments)
export default router