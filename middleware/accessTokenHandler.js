const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler');

const validateToken = asyncHandler(async(req,res,next) =>{
    let token;
    let authHeader = req.headers.authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded) =>{
            if(err){
                res.status(401);
                throw new Error("User is not Authorized");
            }
            req.user = decoded.user;
            next();
        });

        if(!token){
            res.status(401);
            throw new Error("User is not Authorized or token is missing");
        }
    }
});

module.exports = validateToken;
