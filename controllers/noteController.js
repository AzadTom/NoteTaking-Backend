import {notemodel} from '../models/noteModel.js';
import {collabModel} from '../models/collabModel.js';


export const getAllNotes = async(req,res,next)=>{


    try {

        const notes = await notemodel.find({user:req.user._id});


        res.status(200).json({notes});
        
    } catch (error) {
        
        next(error);
    }
}



export const createNotes = async(req,res,next)=>{


    try {

        const {title,content} = req.body;

        const isSuccessfull = await notemodel.create({
            user:req.user._id,
            title:title,
            content:content
        });


        if(!isSuccessfull)
        {
            return res.status(400).json({message:"not created successfully!",isSuccessfull});
        }


        res.status(201).json({message:"created successfully!",isSuccessfull});
        
    } catch (error) {
     
        next(error);
    }

}


export const getnote = async(req,res,next)=>{


    try {

        const {id} = req.params;

        const isSuccessfull = await notemodel.findOne({
            user:req.user._id,
            _id:id
        });


        if(!isSuccessfull)
        {
            return res.status(400).json({message:"not get successfully!",isSuccessfull});
        }


        res.status(201).json({message:"get successfully!",isSuccessfull});
        
    } catch (error) {
     
        next(error);
    }

}



export const updateNotes = async(req,res,next)=>{


    try {

        const {title,content} = req.body;
        const {id} = req.params;

        const isSuccessfull = await notemodel.findByIdAndUpdate(id,{
            user:req.user._id,
            title:title,
            content:content
        },{new:true});


        if(!isSuccessfull)
        {
            return res.status(400).json({message:"not created successfully!",isSuccessfull});
        }


        res.status(201).json({message:"created successfully!",isSuccessfull});
        
    } catch (error) {
     
        next(error);
    }

}


export const deleteNotes = async(req,res,next)=>{


    try {

       
        const {id} = req.params;

        const isSuccessfull = await notemodel.deleteOne({_id:id ,user:req.user._id});
        const isCollabnote  = await collabModel.deleteOne({noteId:id});

        if(!isSuccessfull && !isCollabnote)
        {
            return res.status(400).json({message:"not deleted successfully!",isSuccessfull});
        }


        res.status(201).json({message:"deleted successfully!",isSuccessfull});
        
    } catch (error) {
     
        next(error);
    }

}