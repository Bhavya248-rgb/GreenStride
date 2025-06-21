import asyncHandler from 'express-async-handler';
import jwt from "jsonwebtoken";

const validateToken = asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    console.log("Auth Header:",authHeader);
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is Not Authorized, Token Failed");
            }
            console.log("Decoded:",decoded);
            req.user = decoded.user;
            next();//->why this? because this is a middleware to validate token, if token is valid then next middleware will be called and connect with the route to get the data. Simply after validating token, we need to call next middleware to get the data.
        });
        if(!token){
            res.status(401);
            throw new Error("User is Not Authorized, Token is Missing");
        }
    }
    else{
        res.status(401);
        throw new Error("User is Not Authorized, Token is Missing");
    }
});

export default validateToken;