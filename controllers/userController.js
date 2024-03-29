import { userModel } from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import bcryptjs from 'bcryptjs';
import jwt  from "jsonwebtoken";
import crypto from 'crypto';
import { ErrorHandler } from "../utils/error.js";



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

    res.status(200).json({user:user,token});

    
  } catch (error) {
    
    next(error)
  }


}


export const signup = async(req,res,next)=>{


    try {

        const {name , email , password} = req.body;

        const user = await userModel.findOne({email:email});


        if(user){

            return next(new ErrorHandler("user already registered!",404));

        }

        const hashedpassword = await bcryptjs.hash(password,10);

        const registeruser =  await userModel.create({
            name:name,
            email:email,
            password:hashedpassword
        });


        const token  = jwt.sign({id:registeruser._id},process.env.JWT);

        res.status(201).json({user:registeruser,token});


        
    } catch (error) {


        next(error)
        
    }


}