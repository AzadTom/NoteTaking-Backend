import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },

    email:{

        type:String,
        required:true,
    },

    password:{
        type:String,
        required:true,
    },
    resetPasswordToken:{
        type:String,
        default:null
    },
    resetPasswordExpires:{

         type:String,
         default:null
    },

    createdAt:{

        type:Date,
        default:Date.now

    }
})

export const userModel = mongoose.model("users",userSchema);

