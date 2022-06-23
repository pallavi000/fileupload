const mongoose = require('mongoose')
const fileSchema = new mongoose.Schema({
    name:{type:String,required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,required:true},
    username:{type:String,required:true},
    filesize:{type: Number,required:true},
    filetype:{type:String,required:true},
    hash:{type:String,required:true},
    fileip:{type:String,required:true},
    download_counts:{type:Number,required:true,default:0},
    filetime:{type:String,default:today()},
    filefolderid:{type:String},
    revenue:{type:Number,required:true,default:0},
    duration:{type:String},
    backup_hash:{type:String}


},{timestamps:true})


function today(){
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()+1
    const day =date.getDate()

    return `${year}/${month}/${day}`

}

const File = mongoose.model('file',fileSchema)
module.exports = File