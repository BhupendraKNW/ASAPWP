import jwt from "jsonwebtoken"
import User from "../models/umodel.js";

const protectRoute=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        if(!token)
        {
            return res.status(401).json({error:"Unothorized Nod token p;roveid"})
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({error: "Unothoriz e invalid token"})
        }
        const user =await User.findById(decoded.userId).select("-password");
        if(!user)
            {
                return res.status(400).json({error: "user not found"})
            }
            req.user=user
            next();
    }   
    catch(error)
    {
        console.log("error in pro mid serv",error.message)
      res.status(500).json({error:"internal server protect msg middle server err"})  
    }
}
export default protectRoute;