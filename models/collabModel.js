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

    users:{
        type:[String],
        default:[],
    }
})


export const collabModel =  mongoose.model("collabs",collabSchema);