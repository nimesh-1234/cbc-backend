import mongoose from "mongoose";

const userScheema = new mongoose.Schema(
    {
        email : {
            type : String,
            required : true,
            unique :true
        },
        firstName : {
            type : String,
            required : true,  
        },
        lastName : {
            type : String,
            required : true  
        },
        password :{
            type : String,
            required : true
        },
        type : {
            type : String,
            required : true,
            default : "user"
        },
        isBlock : {
            type : Boolean,
            default : false
        },
        isEmailVerified :{
            type : Boolean,
            default : false
        },
        image :{
            type : String,
            default : "https://www.gravatar.com/avatar/"
        }
    }   
)

const User = mongoose.model("user",userScheema)

export default User