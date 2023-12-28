import express from "express";
import { mongodb } from "./database/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {userRouter} from "./routers/userRouter.js";
import { connectPassword } from "./utils/provider.js";
import session from "express-session";
import passport from "passport";
import path from 'path';

const app = express();

config({path:"./config.env"});




class Server {


    constructor(){


        this.db();
        this.middleWare();
        this.init();
        this.user();
        this.listenServer();
        
        

    }


    init(){


     app.get("/",(req,res)=>{

        res.status(201).render("resetPassword");


     })



    }

    middleWare(){


       
        app.use(express.static(path.join(path.resolve(),"public")));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser());
        app.use(session({
            secret :process.env.SESSION_SECRET,
            saveUninitialized:false,
            resave:false,
        }));
        app.use(passport.authenticate("session"));
        app.use(passport.initialize());
        app.use(passport.session());
        app.enable("trust proxy");
        connectPassword();

        app.set("view engine","ejs");

    }

    db(){

     mongodb();

    }

    user(){

        app.use("/api/v1/users",userRouter);
    }


    listenServer(){


    app.listen(process.env.PORT,()=>{

        console.log(`server is running on ${process.env.PORT}`);
    })

    }

}



new Server();








