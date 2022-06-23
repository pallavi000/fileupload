const mongoose = require('mongoose')
const withdrawSchema = new mongoose.Schema({
    status:{type:String,default:'pending'},
    username:{type:String,required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    totalwithdraw:{type:Number,required:true,default:0},
    email:{type:String,required:true},
    type:{type:String,required:true},
    pdate:{type:Date,required:true, default:new Date().toISOString()}
},{timestamps:true})

const Withdraw = mongoose.model('withdraw',withdrawSchema)
module.exports = Withdraw