import User from "../models/user.js";
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';



export function createUser(req,res){

    const hashepassword  = bcrypt.hashSync(req.body.password,10)

    const user = new User(
        {
            email : req.body.email,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password : hashepassword
        }
    )

    user.save().then(
        ()=>{
            res.json({
                message : "User created Succesfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "failed to create user"
            })
        }
    )
}

export function loginUser(req,res){
    User.findOne(
        {
            email : req.body.email
        }
    ).then(
        (user)=>{
            if(user == null){
                res.status(404).json(
                    {
                        message : "User Not Found"
                    }
                    
            )
            }else{
                const ispasswordMatching = bcrypt.compareSync(req.body.password, user.password)
                if (ispasswordMatching) {

                    const token = jwt.sign(
                        {
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            role: user.type,
                            isEmailVerified: user.isEmailVerified,
                            
                            //token ekt user type eka add krla thibbe nah e nisa admin kenekda kiyala hoya gnn be ekai fail une 
                        },
                        process.env.JWT_SECRET
                    )

                    res.json(
                        {
                            message : "Login succesfull",
                            token: token,
                            user:{
                                email:user.email,
                                firstName:user.firstName,
                                lastName:user.lastName,
                                role:user.type,
                                isEmailVerified:user.isEmailVerified,
                                
                            }
                            
                        }
                    )
                }else{
                    res.statrus(500).json(
                        {
                            message : "Invaliud Password"
                            
                        }
                    )
                }
            }
        }
    )
}

export function isAdmin(req) {
    
    if (req.user == null) {
        return false;
    }

    if (req.user.type != "admin") {
        return false;

    }

    return true;    
}

export function isCustomer(req){
    if (req.user == null) {
        return false;
    }
    if (req.user.role != "user") {
        return false;
    } 
    return true;
}