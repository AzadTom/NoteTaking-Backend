# NoteTaking Backend (Collabrative)




## Global errorMiddleWare




        import {errorMiddleware } from './middleware/errorMiddleware.js';
        
        const app = express();
        
        app.use(errorMiddleware);
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        
        
        app.get("/",(req,res)=>{
        
            res.json({message:"homepage"});
           
        });
        
        app.listent(process.env.PORT,()=>{
        
           console.log("server is running!");
        
        })

## Static Resource

     app.use(express.static(path.join(path.resolve(),"public")));


 ## Ejs file

     app.set("view engine","ejs");


 ##  Cors
 ##### cors stand for  cross origin resource sharing  which is http header implemented by browser for security purpose it allows resources  to same domain  over server ,  any different domain can not access resource from server   
      app.use(cors({
                origin:[process.env.FRONTEND],
                methods:["GET","POST","DELETE","PUT","PATCH"],
                credentials:true
              }))

     
