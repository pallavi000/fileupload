const express = require('express')
const router = express.Router()
const User = require('../Model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
const auth = require('../Middleware/auth')
const File = require('../Model/File')
const Withdraw = require('../Model/Withdraw')



router.get('/dashboard',auth,async(req,res)=>{
    try {
        const uploadfile = await File.find({'user_id':req.user._id}).sort('-createdAt').limit(5)
        const topdownloads = await File.find({'user_id':req.user._id}).sort('download_counts').limit(5)
        const totalfile = await File.countDocuments({'user_id':req.user._id})
        const totalfiles = await File.find({'user_id':req.user._id})
        var balance= 0
        var totaldownloads = 0
        var earning = 0
        for (const file of totalfiles) {
            totaldownloads= totaldownloads+file.download_counts
            earning = earning+file.revenue
        }

        const withdraw =await  Withdraw.find({user_id:req.user._id})
        var totalwithdraw = 0
        for (const draw of withdraw) {
            totalwithdraw += draw.totalwithdraw
        }
        balance = earning-totalwithdraw


        res.send({uploadfile,topdownloads,totalfile,totaldownloads,earning,balance})
        
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/',async(req,res)=>{
    try {
        const user = await User.find()
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
        
    }
})

router.post('/register',async(req,res)=>{
    try {

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hashSync(req.body.password,salt)
        var user = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPassword,
            activationkey:uuidv4()
        })
        user = await user.save()
        res.send(user)
        
    } catch (error) {
        res.status(500).send(error.message)
    } 
})


router.post('/login',async(req,res)=>{
    try {

        const user = await User.findOne({'email':req.body.email})
    if(user){
       
        const valid = await bcrypt.compare(req.body.password,user.password)
        if(valid){
            var token = await jwt.sign({_id:user._id,email:user.email,username: user.username},'fileupload');
            console.log(token)
            res.send(token)
        }else{
            res.status(400).json('Invalid Password')
        }
    }else{
        res.status(404).send('User not found')
    }
        
    } catch (error) {
        res.status(500).json(error.message)
    }
})



router.get('/:id',async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        res.send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})


// current user

router.get('/current/user',auth,async(req,res)=>{
    try {
        const user = await User.findById(req.user._id)
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/edit-profile/:id',auth,async(req,res)=>{
    try {
        const user = await  User.findById(req.user._id)
        if(user){
            if(req.files.image){
                var file=req.files.image

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
                user.image = picture
            }
            user.email=req.body.email
            user.firstname=req.body.firstname
            user.lastname=req.body.lastname
            user.country=req.body.country
            user.gender=req.body.gender
            await user.save()
            res.send(user)
        } else {
            res.status(400).send('User not found.')
        } 
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/change-password',auth,async(req,res)=>{
    try {
        const user = await User.findById(req.user._id)
           if(req.body.newpassword==req.body.confirmpassword){
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.newpassword,salt)
            
            user.password = hashPassword
            await user.save()
            res.send(user)
           }else{
            res.status(400).send('Password did not match')
           }
    } catch (error) {
        res.status(500).send(error.message)
    }
})









module.exports = router