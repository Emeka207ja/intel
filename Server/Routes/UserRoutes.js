import express from 'express'
import { fetchCoin, fetchPaystackPublicKey, fetchUserProfile, forgotPassword, resetPasswordContoller, signInHandler, signUpHandler, updateCoinTotal, updateUserProfile,fetchPaystackPublicKeyPublic } from '../Controller/UserController.js'
import { protect } from '../Util/protected.js'



const router = express.Router()

router.route('/').post(signUpHandler)
router.route('/login').post(signInHandler)

router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword/:id').put(resetPasswordContoller)

router.route('/updateprofile/:id').get(protect,fetchUserProfile)
router.route('/updateprofile/:id').put(protect, updateUserProfile)
router.route('/coin/:id').get(protect, fetchCoin)

router.route('/paystack').get(protect,fetchPaystackPublicKey)
router.route('/paystackpub').get(fetchPaystackPublicKeyPublic)
router.route('/paystack/:id').put(protect,updateCoinTotal)

export default router