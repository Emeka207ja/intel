import express from 'express'
import { fetchPaystackPublicKey, fetchUserProfile, forgotPassword, resetPasswordContoller, signInHandler, signUpHandler, updateUserProfile } from '../Controller/UserController.js'
import { protect } from '../Util/protected.js'



const router = express.Router()

router.route('/').post(signUpHandler)
router.route('/login').post(signInHandler)

router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword/:id').put(resetPasswordContoller)

router.route('/updateprofile/:id').get(protect,fetchUserProfile)
router.route('/updateprofile/:id').put(protect, updateUserProfile)

router.route('/paystack').get(protect,fetchPaystackPublicKey)

export default router