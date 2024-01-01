export const errorMiddleWare = (error,req,res,next)=>{


    error.message = error.message || "Internal Server Error!"
    error.statuscode =  error.statuscode || 500

        
    return res.status(error.statuscode).json({
        success:false,
        message:error.message
    })


  }