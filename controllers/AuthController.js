import { comparePassword, hashPassword } from "../helpers/AuthHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

// POST LOGIN
export const loginController = async (req,res) => {
    try {
        const {email,password} = req.body;
        if(!email){
            return res.send({message: 'email is required'})
        }
        if(!password){
            return res.send({message: 'password is required'})
        }

        // validation
        if(!email || !password) {
            return res.status(404).send({
                success:false,
                message:'Inavlid email or password',
            })
        }
        
        //check user
        const user = await userModel.findOne({email})
        if(user){   
            const match = await comparePassword(password,user.password)

            if(match){
                //token
                const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET_KEY,{
                    expiresIn: "1d",
                });
                
                res.status(200).send({
                    success:true,
                    message:'login successful',
                    user:{
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        posisi: user.posisi,
                        role: user.role,
                    },
                    token,
                })
            

            }else{
                return res.status(200).send({
                    success:false,
                    message:'Invalid password',
                })
            }
        }else{
            return res.status(200).send({
                success:false,
                message:'Email is not registered',
            })
        }



    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
    }

}

