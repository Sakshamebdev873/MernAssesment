import mongoose from "mongoose";
const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    title : {type:String,required: true},
    status: {
      type: String,
      enum: ["available", "claimed", "disabled"],
      default: "available",
    },
    claimedBy: { type: String, default: null },
  },
  { timestamps: true }
);
couponSchema.index({ code: 1 }, { unique: true });
export default mongoose.model("Coupon", couponSchema);
