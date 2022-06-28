const express = require('express')
const auth = require('../Middleware/auth')
const router = express.Router()
const File = require('../Model/File')
const { v4: uuidv4 } = require('uuid');


router.post('/',auth,async(req,res)=>{
    try {

        const pageno = req.body.pageno-1
        const itemsCountPerPage = req.body.itemsCountPerPage

        const files = await File.find({user_id:req.user._id}).sort('-_id').skip(pageno*itemsCountPerPage).limit(itemsCountPerPage)
        const totalitems  = await File.countDocuments({user_id:req.user._id})

        res.send({files,totalitems})
        
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/upload',auth,async(req,res)=>{
    try {
        var resolution=''
        var picture=''
        if(req.files.file){
            let files = []
            if(req.files.file.length) {
                files = req.files.file
            } else {
                files = [req.files.file]
            }
            for (const file of files) {
                var r = Math.random()
            r = r.toString().replace('.','-')
           
            const fileName = new Date().getDate()+r+'.'+file.name.split('.').pop()
            const uploadPath = process.env.FILE_UPLOAD_PATH+'/'+fileName    
            file.mv(uploadPath,function(error){
                if(error){
                    is_error= error
                    console.log(error)
                }
            })
            picture = '/assets/files/'+fileName

            const filetype= file.name.split('.').pop()
            const ip = req.connection.remoteAddress
            const filesize = file.size
    
            var fileupload = new File({
                'name':fileName,
                'user_id':req.user._id,
                'hash':uuidv4(),
                'fileip':ip,
                'filesize':filesize,
                'filetype':filetype,
                username:req.user.username,
                duration:0,
                resolution:'',
                filefolderid:picture
    
            })
            fileupload = await fileupload.save()
            
            }
            
            res.send('success')
    
        }else{
            res.status(404).send('file cant be empty')
        }
        
    } catch (error) {
        res.status(500).send(error.message)
    }
   
})

router.get('/:id',auth,async(req,res)=>{
    try {
        const file = await File.findById(req.params.id)
        res.send(file)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.put('/:id',auth,async(req,res)=>{
    try {
        const file =await  File.findByIdAndUpdate(req.params.id,{
            name:req.body.name
        },{new:true})
        res.send(file)

    } catch (error) {
        res.status(500).send(error.message)
    }
   
})

router.get('/download/:id',async(req,res)=>{
    try {
        const file = await File.findById(req.params.id)
        file.download_counts=file.download_counts+1
        await file.save()
        var filepath=`../frontend/public${file.filefolderid}`
        res.download(filepath)
        
    } catch (error) {
        res.status(500).send(error.message)
    }
})





router.delete('/:id',auth,async(req,res)=>{
    try {
        const file = await File.findByIdAndDelete(req.params.id)
        res.send(file)
    } catch (error) {
        res.send(error.message)
    }
})



router.post('/report/generate',auth,async(req,res)=>{
    try {
        const pageno = req.body.pageno-1
        const itemsCountPerPage = req.body.itemsCountPerPage


        const files= await File.find({user_id:req.user._id}).sort('-_id').skip(pageno*itemsCountPerPage).limit(itemsCountPerPage)
        const totalitems  = await File.countDocuments({user_id:req.user._id})
        const topdownload = await File.find({user_id:req.user._id}).sort('download_counts').limit(5)
        const toprevenue = await File.find({user_id:req.user._id}).sort('revenue').limit(5)
        res.send({files,topdownload,toprevenue,totalitems})
        
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/search',auth,async(req,res)=>{
    try {
        const files = await File.find({user_id:req.user._id,name:{ $regex: '.*' + req.body.input + '.*' }})
        res.send(files) 
        
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports= router