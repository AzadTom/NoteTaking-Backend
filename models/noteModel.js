import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({


    user:{

     type: mongoose.Schema.Types.ObjectId,
     ref:"users",
     required:true

    },
    title:{

        type:String,
        required:true
    },
    content:{
        type:String,
        default:null
    },
    createdAt:{

        type:Date,
        default:Date.now

    }


})

export const notemodel = mongoose.model("notes",noteSchema);
