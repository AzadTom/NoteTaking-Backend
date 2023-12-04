import { userModel } from "../models/userModel.js";
import {ErrorHandler} from '../utils/error.js';
import bcryptjs from 'bcryptjs';
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
        else{

            next();

        }


    }else{

        next();
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