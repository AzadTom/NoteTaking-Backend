import mongoose from "mongoose";

const collabSchema = new mongoose.Schema({

    userId:{
        
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },

    noteId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"notes",
        required:true,
    },

    user:{
        type:String,
        required:true,
    }
})


export const collabModel =  mongoose.model("collabs",collabSchema);