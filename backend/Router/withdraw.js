const express = require('express')
const router = express.Router()
const Withdraw = require('../Model/Withdraw')
const auth = require('../Middleware/auth')
const File = require('../Model/File')

router.get('/',auth,async(req,res)=>{
    try {
        const withdraw = await Withdraw.find({'user_id':req.user._id}).sort('-_id')
        res.send(withdraw)
        
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/current',auth,async(req,res)=>{

    try {
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
        res.json(balance)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/',auth,async(req,res)=>{
    try {
        if(req.body.amount>req.body.balance){
            return res.status(403).send('Amount can not be greater than balance')
        }
        var withdraw = new Withdraw({
            totalwithdraw:req.body.amount,
            type:req.body.type,
            email:req.body.email,
            username:req.user.username,
            user_id:req.user._id,
        })
        withdraw = await withdraw.save()
        res.send(withdraw)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router