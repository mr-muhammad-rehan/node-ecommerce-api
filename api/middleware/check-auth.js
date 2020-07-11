const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    try{ 
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secrete');
        req.userData = decoded;
        next();
    }catch(err){
        res.status(401).json({
            error: 'Auth Faild',
            trace: err
        });
    }
}