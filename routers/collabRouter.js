import express from 'express';
import {collabModel} from '../models/collabModel.js';
import { notemodel } from '../models/noteModel.js';
import  { isAuthenticate} from '../middleware/userAuthenticate.js';


const collabRouter = express.Router();


collabRouter.post("/",isAuthenticate,async(req,res)=>{

   
    const { noteid , emailslist} = req.body;
    const {_id:userId} = req.user;



    const isFound = await collabModel.findOne({noteId:noteid});

    if(isFound)
    {
        const iscollabupdated  = await isFound.updateOne ({
            userId:userId,
            noteId: noteid,
            users:emailslist,
        })


        if(!iscollabupdated)
        {
            return res.status(400).json({message:false,iscollabupdated});
        }

        res.status(200).json({message:true,iscollabupdated});

    }
    else
    {

        const iscollabcreated  = await collabModel.create({
            userId:userId,
            noteId: noteid,
            users:emailslist,
        })


        if(!iscollabcreated)
        {
            return res.status(400).json({message:false,iscollabcreated});
        }

        res.status(201).json({message:true,iscollabcreated});

    }
    
})



collabRouter.get("/invitenotes",isAuthenticate,async(req,res,next)=>{


     try {

        const currentEmail  = req.user.email;

        const collabslist = await collabModel.find({users:{$in:[currentEmail]}});

        const collabnotes = [];

        for(const collab of collabslist)
        {
            const notedoc = await notemodel.find({_id:collab.noteId});
            collabnotes.push(notedoc);

        }

        res.json({ inviteuser :collabnotes });
        
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
