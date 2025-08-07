import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import jwt from 'jsonwebtoken';
import productRouter from "./routes/productRouter.js";

const app = express()

app.use(express.json())

//athentication
app.use(
    (req,res,next)=>{
       let token = req.headers["authorization"];

      if (token != null) {
            token = token.replace("Bearer ","")
            console.log(token)

            //decript
            jwt.verify(token, "jwt-secret", 
                (err,decoded)=>{

                    if (decoded == null) {
                        res.json(
                            {
                                message : "invalid token please login again"
                            }
                        )
                        return
                    }else{
                        //console.log(decoded)
                        req.user = decoded
                    }
            })
      }
      next()
    }
)

//database 
const connectionString = "mongodb+srv://admin:1234@cluster0.hunrete.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


mongoose.connect(connectionString).then(
    ()=>{
        console.log("database connected sucessfully")
    }
).catch(
    ()=>{
        console.log("database not connected")
    }
)

//day5 plug routers

app.use("/users",userRouter)
app.use("/products", productRouter)



//requeset,response
/*app.get("/", 
    (req,res)=>
{
    console.log(req.body)
    console.log("get request recieved")

    let prifix = "Mr."
    if(req.body.gender == "male"){
        prifix = "Ms."
    }

    res.json(
            {
                message : "hello "+prifix+" "+req.body.name
            }
        )
}
)*/




//one time use function
app.listen(5000, 
    ()=>{
        console.log("server is running is port 5000")
        
    }
)
