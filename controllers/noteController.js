import {notemodel} from '../models/noteModel.js';



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

        if(!isSuccessfull)
        {
            return res.status(400).json({message:"not created successfully!",isSuccessfull});
        }


        res.status(201).json({message:"deleted successfully!",isSuccessfull});
        
    } catch (error) {
     
        next(error);
    }

}