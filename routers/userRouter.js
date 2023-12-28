import express from 'express';
import passport from 'passport';
import { isAuthenticate } from '../middleware/userAuthenticate.js';
import {signup,login,logout ,myProfile,forget ,resetPassword,changePassword} from '../controllers/userController.js';

const userRouter = express.Router();





userRouter.get("/logout",logout);

userRouter.get("/googlelogin",passport.authenticate("google",{
    scope:["profile","email"]
}))


userRouter.get("/login",passport.authenticate("google"),(req,res)=>{

    res.status(200).json({message:"logged In!",user:req.user})
})

userRouter.get("/me",isAuthenticate,myProfile);


userRouter.post("/signup",signup);

userRouter.post("/login",login);


userRouter.post("/forget",forget);


userRouter.post("/reset/:token",changePassword);

userRouter.get("/reset/:token",resetPassword);





export {userRouter}
