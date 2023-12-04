import mongoose from "mongoose";

const googleSchema =  new mongoose.Schema({

    googleId:{
        type:String,
        required:true
    },

    name:{
        type:String,
        required:true,
    },

    photo:{
        type:String,
        required:true
    },

    createdAt:{

        type:Date,
        default:Date.now

    }
})

export const googleModel = mongoose.model("google",googleSchema);

