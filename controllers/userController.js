import { userModel } from "../models/userModel.js";
import {ErrorHandler} from '../utils/error.js';
import { sendEmail } from "../utils/sendEmail.js";
import bcryptjs from 'bcryptjs';
import jwt  from "jsonwebtoken";
import crypto from 'crypto';



export const forget = async(req,res,next)=>{



    const email = req.body.email;


    const resetToken = crypto.randomBytes(20).toString('hex');

    const isFound = await userModel.findOne({email});


    if(!isFound)
    {
        return next(new ErrorHandler("user not found!",404));
    }


    isFound.resetPasswordToken = resetToken;
    isFound.resetPasswordExpires = Date.now()+3600000;

    await isFound.save();

    
    sendEmail(email,"Password-reset",req.headers.host,resetToken);
    
    res.status(200).json({message:"Password reset email sent. Check in your inbox!"});



}

export const resetPassword = async(req,res,next)=>{


    try {

        const {token}= req.params;

        const user = await userModel.findOne({
            resetPasswordToken:token,
            resetPasswordExpires:{$gt:Date.now()},
        });

        if(!user)
        {
            return res.status(400).json({message:"Invalid or expired token"});
        }

        res.render("resetPassword",{token});
        
    } catch (error) {

        next(error);
        
    }


}



export const changePassword = async(req,res,next)=>{


    try {

        const {password} = req.body;
        const{token}  = req.params;

        const user = await userModel.findOne({
            resetPasswordToken:token,
            resetPasswordExpires:{$gt:Date.now()},
        });

        if(!user)
        {
            return res.status(400).json({message:"Invalid or expired token"});
        }

        const hashedpassword = await bcryptjs.hash(password,10);

        user.password = hashedpassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        res.status(200).json({message:"password-reset successfully!"});

        
    } catch (error) {
        
        next(error);
    }
}




export const myProfile = async(req,res)=>{


    const usertoken = await req.cookies["usertoken"];


    if(usertoken)
    {

        const token = jwt.verify(usertoken,process.env.JWT);

        const user  = await userModel.findById(token.id);
    
        req.user = user;

    }

   

    await res.status(200).json({message:true,user:req.user});

}

export const logout = async(req,res,next)=>{



    

    try {


        const usertoken = await req.cookies["usertoken"];

        const googletoken  = await req.cookies["connect.sid"];
        

        if(!googletoken){

            if(!usertoken)
            {
                return next(new ErrorHandler("user not loggedIn!",404));
            }
            else{

                await res.status(200).cookie(process.env.COOKIE,"",{
                    httpOnly:true,
                    maxAge:15*60*1000,
                    sameSite:process.env.NODE_ENV === "Development"? "lax":"none",
                    secure:process.env.NODE_ENV === "Development"? false :true
                }).json({success:true,usertoken})
            }

            
        }else
        {

            await req.logOut((err)=>{

                if(err)
                {
                    return next(err);
                }
                else{

                    
                    res.redirect("/");
                    
                }
            });
            



        }


       
        
    } catch (error) {


        next(error);
        
    }

}

export const login = async(req,res,next)=>{



  try {

    const {email,password} = req.body;

    const user = await userModel.findOne({email:email});

    if(!user){

        return next(new ErrorHandler("user is not registered yet!",401));
    }

    const isMatch = bcryptjs.compare(password,user.password);

    if(!isMatch){

        return next(new ErrorHandler("password does not matched!",404));

    }


    const token = jwt.sign({id:user._id},process.env.JWT);

    res.status(201).cookie(process.env.COOKIE,token,{
        httpOnly:true,
        maxAge:15*60*1000,
        sameSite:process.env.NODE_ENV === "Development"? "lax":"none",
        secure:process.env.NODE_ENV === "Development"? false :true
    }).json({founduser:user,token});

    
  } catch (error) {
    
    next(error)
  }


}


export const signup = async(req,res,next)=>{


    try {

        const {name , email , password} = req.body;

        const user = await userModel.findOne({email:email});


        if(user){

            return next( new ErrorHandler("user already registered!",404));

        }

        const hashedpassword = await bcryptjs.hash(password,10);

        const registeruser =  await userModel.create({
            name:name,
            email:email,
            password:hashedpassword
        });


        const token  = jwt.sign({id:registeruser._id},process.env.JWT);

        res.status(201).cookie(process.env.COOKIE,token,{
            httpOnly:true,
            maxAge:15*60*1000,
            sameSite:process.env.NODE_ENV === "Development"? "lax":"none",
            secure:process.env.NODE_ENV === "Development"? false :true
        }).json({createduser:registeruser,token});


        
    } catch (error) {


        next(error)
        
    }


}