import { ErrorHandler } from "../utils/error.js";
import { userModel } from "../models/userModel.js";
import Jwt  from "jsonwebtoken";

export const isAuthenticate = async(req,res,next)=>{


    const googletoken  = await req.cookies["connect.sid"];

   
    let usertoken  = req.headers["authorization"];

    console.log(usertoken);



    try {

        if(!usertoken)
        {
    
            next(new ErrorHandler("user not loggedIn",404));
        }
        else
        {
    
                usertoken = usertoken.split(" ")[1];
    
                const token = Jwt.verify(usertoken,process.env.JWT);
        
                const user  = await userModel.findById(token.id);
            
                req.user = user;
    
                next();
        }
        
    } catch (error) {
        
        next(error);
    }
    

       

        
        
}

   
