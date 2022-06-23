const jwt = require('jsonwebtoken')

function auth(req,res,next){
    const token = req.header('access-token')
    console.log(token)
    try {
        const decode = jwt.verify(token,'fileupload')
        req.user = decode
        console.log(decode)
        next()
    } catch (error) {
        res.status(400).json(error.message)

    }

}

module.exports = auth