import express from 'express';
import passport from 'passport';
import {signup,login,logout ,isAuthenticate,myProfile} from '../controllers/userController.js';

const userRouter = express.Router();







userRouter.get("/logout",logout);

userRouter.get("/googlelogin",passport.authenticate("google",{
    scope:["profile"]
}))


userRouter.get("/login",passport.authenticate("google"),(req,res)=>{

    res.status(200).json({message:"logged In!",user:req.user})
})

userRouter.get("/me",isAuthenticate,myProfile);


userRouter.post("/signup",signup);

userRouter.post("/login",login);



export {userRouter}
