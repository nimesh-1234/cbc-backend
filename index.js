import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import jwt from 'jsonwebtoken';
import productRouter from "./routes/productRouter.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express()

app.use(cors());
app.use(express.json())

//athentication
app.use(
    (req,res,next)=>{
       let token = req.headers["authorization"];

      if (token != null) {
            token = token.replace("Bearer ","")
            console.log(token)

            //decript
            jwt.verify(token,process.env.JWT_SECRET, 
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
const connectionString = process.env.MONGO_URI


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

app.use("/api/users",userRouter)
app.use("/api/products", productRouter)



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
