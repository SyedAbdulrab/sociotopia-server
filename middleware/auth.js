// A user that is logged in can do some stuff that 
// non logged in user can't do, this is done via authorization.

import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next) => {
    try {
        console.log("Inside verify token")
        let token = req.header("Authorization")// the frontend will be setting this and we will be fetching this at the backend through this
        if (!token){
            return res.status(403).send("Access denied")
        }
        if (token.startsWith("Bearer ")){
            // getting everything on the left side of the bearer
            token = token.slice(7, token.length).trimLeft();
        }
        // this is where we verify the token with jwt 
        const verified = jwt.verify(token , process.env.JWT_SECRET );

        req.user = verified;
        console.log('passing onto next')
        next(); // for middleware we have o use this so after the middleware runs it will proceed to the next function
    }
    catch (err){
        res.status(500).json({error:err.message})
    }
}