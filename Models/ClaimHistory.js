import mongoose from "mongoose"
const claimHistorySchema = new mongoose.Schema({
    couponCode : {type:String,required : true},
    claimedBy : {type:String,required : true},
    claimedAt : {type:Date,default:Date.now()}
})
export default mongoose.model('ClaimHistory',claimHistorySchema)