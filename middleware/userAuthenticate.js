export const isAuthenticate = async(req,res,next)=>{


    const googletoken  = await req.cookies["connect.sid"];

    const usertoken = await req.cookies["usertoken"];



    if(!googletoken || !req.user)
    {

        if(!usertoken)
        {

            next(new ErrorHandler("user not loggedIn;",404));
        }
        else{

            next();

        }


    }else{

        next();
    }

   
}