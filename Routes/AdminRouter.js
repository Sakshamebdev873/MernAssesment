import express from "express";
import {login,addCoupon, getAllCoupon, updateCoupon, deleteCoupon, getClaimedCoupon, getClaimedHistory, logout, getSingleCoupon} from "../controllers/adminController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", login);
router.get('/logout',logout)
router.post('/add',authMiddleware,addCoupon)
router.get('/coupons',getAllCoupon)
router.get('/claimed',authMiddleware,getClaimedCoupon)
router.patch('/update/:id',authMiddleware,updateCoupon)
router.get('/coupon/:id',authMiddleware,getSingleCoupon)
router.get('/history',authMiddleware,getClaimedHistory)
router.delete('/delete/:id',authMiddleware,deleteCoupon)
export default router;
