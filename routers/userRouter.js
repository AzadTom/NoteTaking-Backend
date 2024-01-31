import express from 'express';
import passport from 'passport';
import {signup,login,forget ,resetPassword,changePassword} from '../controllers/userController.js';

const userRouter = express.Router();


userRouter.get("/googlelogin",passport.authenticate("google",{
    scope:["profile","email"]
}))


userRouter.get("/login",passport.authenticate("google"),(req,res)=>{

    res.status(200).json({message:"logged In!",user:req.user})
})


userRouter.post("/signup",signup);

userRouter.post("/login",login);


userRouter.post("/forget",forget);


userRouter.post("/reset/:token",changePassword);

userRouter.get("/reset/:token",resetPassword);





export {userRouter}
