import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
});
adminSchema.index({ username: 1 }, { unique: true });
export default mongoose.model("Admin", adminSchema);
