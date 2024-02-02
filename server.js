import express from "express";
import {errorMiddleWare } from './middleware/errorMiddleware.js';
import { mongodb } from "./database/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {userRouter} from "./routers/userRouter.js";
import {noteRouter} from './routers/noteRouter.js';
import {collabRouter } from "./routers/collabRouter.js";
import {connectPassword } from "./utils/provider.js";
import session from "express-session";
import passport from "passport";
import path from 'path';
import cors from 'cors';

const app = express();

config({path:"./config.env"});




class Server {


    constructor(){


        this.db();
        this.middleWare();
        this.init();
        this.routes();
        this.listenServer();
        
        

    }


    init(){


      app.get("/",(req,res)=>{

        res.status(200).json({api:"api is working!"});
     })



    }

    middleWare(){


        app.set("view engine","ejs");
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

        app.use(cors({
            origin:[process.env.FRONTEND,process.env.FRONTEND1],
            methods:["GET","POST","DELETE","PUT","PATCH"],
            credentials:true
          }))

       

    }

    db(){

     mongodb();

    }

    routes(){

        app.use("/api/v1/users",userRouter);
        app.use("/api/v1/notes",noteRouter);
        app.use("/api/v1/collabs",collabRouter);
        app.use(errorMiddleWare);
    }

   


    listenServer(){


        app.listen(process.env.PORT,()=>{

            console.log(`server is running on ${process.env.PORT} in ${process.env.NODE_ENV}`);
        })

    }

}



new Server();








