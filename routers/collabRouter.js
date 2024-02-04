import express from 'express';
import {collabModel} from '../models/collabModel.js';
import { notemodel } from '../models/noteModel.js';
import  { isAuthenticate} from '../middleware/userAuthenticate.js';
import { ErrorHandler } from '../utils/error.js';


const collabRouter = express.Router();


collabRouter.post("/",isAuthenticate,async(req,res)=>{

   
     try {

        const { noteid , email} = req.body;
        const {_id:userId} = req.user;



        const isCollabexist = await collabModel.findOne({noteId:noteid,user:email})
        
         if(isCollabexist)
         {
             return next(new ErrorHandler("collab is already exist!",404));
         }

         const iscollabcreated  = await collabModel.create({
            userId:userId,
            noteId: noteid,
            user:email,
        })


        res.status(201).json({message:true, iscollabcreated});
        
    
     } catch (error) {
        
        next(error);

     }


    
    
})



collabRouter.get("/invitenotes",isAuthenticate,async(req,res,next)=>{


     try {


        const collabslist = await collabModel.find({user:req.user.email});

        const collabnotes = [];

        for(const collab of collabslist)
        {
            const notedoc = await notemodel.find({_id:collab.noteId});
            collabnotes.push(notedoc);

        }

        res.json({collabnotes});
        
     } catch (error) {
        
        next(error);
     }


})


collabRouter.get("/collabnotes",isAuthenticate,async(req,res,next)=>{


      try {


            const  collabslist = await collabModel.find({userId:req.user._id});

            const collabnotes = [];

            for(const collab of collabslist)
            {
                const notedoc = await notemodel.find({_id:collab.noteId});
                collabnotes.push(notedoc);

            }

            res.json({ owner:collabnotes });


        
      } catch (error) {
        
        next(error);

      }

})


collabRouter.get("/",isAuthenticate,async(req,res)=>{

    const lists  = await collabModel.find({});
    
    res.status(400).json({message:true,collabs:lists});


})




export {collabRouter}
