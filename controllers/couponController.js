import { StatusCodes } from "http-status-codes";
import Coupon from "../Models/Coupon.js";
import ClaimHistory from "../Models/ClaimHistory.js";

// Utility Function: Get Client IP
const getClientIP = (req) => {
    const forwardedIP = req.headers['x-forwarded-for'];
    const rawIP = forwardedIP || req.connection.remoteAddress || req.ip;
    return rawIP === '::1' ? '127.0.0.1' : rawIP;
};

// Cooldown Duration (10 minutes)
const COOLDOWN_TIME = 10 * 60 * 1000;

const claimCoupon = async (req, res) => {
    const userIP = getClientIP(req);
    const { id } = req.params; // Extract coupon ID from params
    const claimedCoupon = req.cookies?.claimedCoupon;
    const lastClaimTime = req.cookies?.lastClaimTime;
    const now = Date.now();

    // ❗ Step 1: Verify `couponId` Exists in the Database
    const selectedCoupon = await Coupon.findById(id);

    if (!selectedCoupon) {
        return res.status(404).json({ error: "❌ Invalid or unavailable coupon ID." });
    }

    // ❗ Step 2: Cooldown Check
    if (claimedCoupon && lastClaimTime && now - lastClaimTime < COOLDOWN_TIME) {
        const remainingTime = Math.ceil((COOLDOWN_TIME - (now - lastClaimTime)) / 60000);
        return res.status(429).json({ 
            error: `⏳ Please wait ${remainingTime} minutes before claiming another coupon.` 
        });
    }

    // ❗ Step 3: Ensure Coupon is Available
    if (selectedCoupon.status !== 'available') {
        return res.status(400).json({ error: '❌ Coupon is no longer available.' });
    }

    // ❗ Step 4: Mark the Coupon as Claimed
    selectedCoupon.status = 'claimed';
    selectedCoupon.claimedBy = userIP;
    await selectedCoupon.save();

    // ❗ Step 5: Store Claim in History
    await ClaimHistory.create({
        couponCode: selectedCoupon.code,
        claimedBy: userIP
    });

    // ❗ Step 6: Store Claim Data in Cookies for Cooldown Tracking
    res.cookie('claimedCoupon', selectedCoupon.code, {
        maxAge: COOLDOWN_TIME,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    });

    res.cookie('lastClaimTime', now, {
        maxAge: COOLDOWN_TIME,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    });

    // ❗ Step 7: Send Success Response
    res.status(StatusCodes.OK).json({ 
        success: `✅ Coupon claimed successfully: ${selectedCoupon.code}` 
    });
};

export default claimCoupon;
