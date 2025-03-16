import express from 'express'

import claimCoupon from '../controllers/couponController.js'

const router = express.Router()

router.get('/claim/:id',claimCoupon)
export default router