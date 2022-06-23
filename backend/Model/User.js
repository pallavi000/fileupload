const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    account_type:{type:String,default:'free'},
    firstname:{type:String},
    lastname:{type:String},
    country:{type:String},
    gender:{type:String},
    activationkey:{type:String,required:true},
    endtime:{type:String,default:today()},
    trn_date:{type:String,default:today()},
    referrallink:{type:String},
    isbanned:{type:Number,default:0},
    activate:{type:Number,default:0},
    image:{type:String}

},{timestamps:true})


function today(){
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()+1
    const day =date.getDate()

    return `${year}/${month}/${day}`

}


const User = mongoose.model('user',userSchema)
module.exports = User