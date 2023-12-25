const User = require('../models/userModel')

const jwt = require('jsonwebtoken')

exports.adminAuth = async(req, res, next) =>{
    try{
        const {authorization} = req.headers;

    if (!authorization){
        res.status(400).json({error: "Authorization required"})
    }

    const token = authorization.split(' ')[1]

    const {_id} = jwt.verify(token, process.env.SECRET)

    const user = await User.findOne({_id})

    if (user.role !== 'admin'){
        res.status(400).json({error: "You are not an admin"})
    }
    
    next()
    }
    catch(error){
        res.status(400).json(error.message)
    }
}