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

## MongoDb

        1. Login with google
        2. Go to Database option and create new clustor
        3. Choose Shared option
        4. Choose mumbai location
        5.  final click on create clustor (but you can create only once clustor on mongodb for free)

        6. If clustor already created then  you see connect button 
        7. Choose  a way to connct with your application ( choose compass option )
        8. copy that string which is essential
        9. and replace username and passoword

        steps for username and password

        1. Go to network access section 
        2. 0.0.0.0/0  ( add current ip address by default )
        3. Go to Database access section
        4. add user with name and passowrd and assign role as well...


              

     
