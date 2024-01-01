import { ErrorHandler } from "../utils/error.js";
import { userModel } from "../models/userModel.js";
import jwt  from "jsonwebtoken";

export const isAuthenticate = async(req,res,next)=>{


    const googletoken  = await req.cookies["connect.sid"];

    const usertoken = await req.cookies["usertoken"];


   

    if(!googletoken || !req.user)
    {


       

        if(!usertoken)
        {

            next(new ErrorHandler("user not loggedIn;",404));
        }
        else
        {

            const token = jwt.verify(usertoken,process.env.JWT);
        
                const user  = await userModel.findById(token.id);
            
                req.user = user;

                next();
        }
        
    }else{

        next();
    }

   
}