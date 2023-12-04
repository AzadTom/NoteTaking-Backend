import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {googleModel} from '../models/googleModel.js'
import passport from  "passport";


export const connectPassword =  ()=>{

     passport.use(new GoogleStrategy({
        clientID : process.env.CLIENTID,
        clientSecret:process.env.CLIENTSECRET,
        callbackURL:process.env.GOOGLE_CALLBACK
     },async function(accessToken,refreshToken,profile,done){



        const user  = await googleModel.findOne({
            googleId:profile.id,
        });


        if(!user){

                const newUser = await googleModel.create({
                googleId:profile.id,
                name:profile.displayName,
                photo:profile.photos[0].value
            })

            return done(null,newUser);

        }
        else
        {

            return done(null,user);

        }




     }));


     passport.serializeUser((user,done)=>{

         done(null,user.id);

     });



     passport.deserializeUser(async (id,done)=>{

        const user  = await googleModel.findById(id);
          done(null,user);

     });

}