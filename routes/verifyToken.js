const jwt = require('jsonwebtoken');
const config = require("../config")

module.exports = function (req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({'msg':'Access Denied'});

    try{
        const verified = jwt.verify(token, config.key);
        req.user = verified;
        next()
    }catch(err){
        res.status(400).json({msg:"Invalid Token"});
    }
}