import jwt from "jsonwebtoken";
import crypto from 'crypto'
// import Admin from '../Models/Admin.js'
import { StatusCodes } from "http-status-codes";
import Coupon from "../Models/Coupon.js";
import ClaimHistory from '../Models/ClaimHistory.js'

const login = async (req, res) => {
  const { username, password} = req.body;
  if (username === "Sakshamarya" && password === "1234567890") {
    const token = jwt.sign({ username: "Sakshamarya", role: 'admin' }, "secret", {
      expiresIn: "1d",
    })
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24*60*60*1000),
      secure: process.env.NODE_ENV === "development",
    });
    return res
      .status(StatusCodes.OK)
      .json({ msg: "Admin successfuly logged in..", Token: token });
  } else {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Invalid Credentials or else you are not a admin" });
  }
};
const logout = async (req,res) =>{
res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
}




// Add coupon
const addCoupon = async (req, res) => {
  try {
    const { title, status, code } = req.body;

    // ✅ Generate code if 'code' is empty
    const generatedCode = crypto.randomBytes(8).toString('hex').slice(0, 16);
    const finalCode = !code ? generatedCode : code; // ✅ Correct assignment

    const coupon = await Coupon.create({ status, code: finalCode, title });

    res
      .status(StatusCodes.CREATED)
      .json({ msg: "✅ Successfully created.", coupon });
  } catch (error) {
    console.error("❗ Error creating coupon:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "❌ Failed to create coupon." });
  }
};




// Get All coupon
const getAllCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.find();
    res.status(StatusCodes.CREATED).json({ coupon, count: coupon.length });
  } catch (error) {
    console.log(error);
  }
};





const getClaimedCoupon = async(req,res) =>{
  try {
    const coupon = await Coupon.find({status:'claimed'})
    if(!coupon.length) {
      return res.status(StatusCodes.NOT_FOUND).json({msg:'no coupon available right now'})
    }
    res.status(StatusCodes.OK).json({coupon})
  } catch (error) {
    console.log(error)
  }
}





// updateCoupon
const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log
    const { title, status,code } = req.body;
    // console.log(_id);
    const couponExists = await Coupon.findById(id);
    if (!couponExists) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Coupon not found." });
    }
    const coupon = await Coupon.findByIdAndUpdate(
      id,
      { title , status,code },
      { new: true }
    );
    if (!coupon) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Invalid id.." });
    }
    res.status(StatusCodes.OK).json({ coupon, msg: "Successfully updated.." });
  } catch (error) {
    console.log(error);
  }
};







// Delete Coupon
const deleteCoupon = async(req,res) =>{
    const { id } = req.params;
    const couponExists = await Coupon.findById(id);
    if (!couponExists) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Coupon not found." });
    }
    const coupon = await Coupon.findByIdAndDelete(id)
    if(!coupon){
        res.status(StatusCodes.OK).json({msg:'Invalid Id....'})
    }
    res.status(StatusCodes.OK).json({msg:'Successfully deleted....'})
}

const getSingleCoupon = async (req,res) =>{
const {id} = req.params;
const coupon = await Coupon.findById(id)
return res.status(StatusCodes.OK).json({coupon})
}




const getClaimedHistory = async (req,res) =>{
  const coupon = await ClaimHistory.find({}).sort({claimedAt : -1});
  if(!coupon.length){
    res.status(StatusCodes.NOT_FOUND).json({msg:"no claimed coupon yet...."})
  }
  const latestClaim = coupon[0];
  res.status(StatusCodes.OK).json({coupon,msg : `Last coupon is claimed at this address ${latestClaim.claimedBy}`})
} 




export { login,getClaimedCoupon,getSingleCoupon, addCoupon, getAllCoupon, updateCoupon,deleteCoupon,getClaimedHistory,logout };