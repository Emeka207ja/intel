import express from "express"
import { updatePriceHandler, fetchPriceHandler } from "../Controller/PriceController.js"
import {protect} from '../Util/protected.js'
const router = express.Router()

router.route("/allprice").get(fetchPriceHandler);
router.route("/allprice/:id").put(updatePriceHandler,)

export default router