import express, { Router } from "express"
import {protect} from '../Util/protected.js'
const router = express.Router()
import { stakingController, fetchAllStakes, fetchSingleStake } from "../Controller/StakingController.js"


router.route("/placestake/:id").post(protect,stakingController);
router.route("/allstakes").get(fetchAllStakes);
router.route("/allstakes/:id").get(fetchSingleStake);

export default router;