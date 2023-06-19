const jwt = require('jsonwebtoken');
let {User} = require('../models/user.model');




exports.authenticate = async (req, res, next) => {
    
    try {

        if (!req.header('Authorization')) return res.status(401).send({status:false , msg:" login failed or Unauthorized "})
         console.log(req.header)
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) return res.status(400).send({status:false , msg:"invalid token"})

        const decoded = await jwt.verify(token, "prakash");
        const user = await User.findOne({ _id: decoded._id })

        if (!user) return res.status(404).send({status:false , msg:"user not found"})
    
        req.token = token;
        req.user = user;

        next();
    } catch (err) {
        console.log('Error(authenticate): ', err)
        return res.status(500).send({status:false , message:err}); 
    }
}

