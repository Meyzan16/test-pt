
import userModel from "../models/userModel.js";
import fs from 'fs';
import { comparePassword, hashPassword } from "../helpers/AuthHelper.js";

export const getUserController = async (req,res) => {
    try {           
        const userDoc = await userModel.find({}).select("-photo").sort({createdAt:-1})
        res.status(200).send({
            success:true,
            message:'All users list',
            userDoc,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting all users',
            error
        })
    }
}

export const createUserController = async (req,res ) => {
    try {
        const {name,email,password,posisi,phone} = req.fields
        const {photo} = req.files

        // validation
        switch(true){
            case photo && photo.size > 1000000: 
            return res.status(200).send({
                success:false,message: 'Photo is required and should be less then 1mb'
            });
            case !photo : 
            return res.status(200).send({
                success:false,message: 'Photo is required'
            });
            case !name: return res.status(200).send({success:false,message: 'name is required'});
            case !email: return res.status(200).send({success:false,message: 'email is required'});
            case !password: return res.status(200).send({success:false,message: 'password is required'});
            case !posisi: return res.status(200).send({success:false,message: 'posisi is required'});
            case !phone: return res.status(200).send({success:false,message: 'phone is required'});
        }


        //check user
        const existingUser = await userModel.findOne({email})
        //existing user
        if(existingUser){
            res.status(200).send({
                success:false,
                message:'Email already please login',
            })
        }   

                const hashedPassword = await hashPassword(password);

                try{
                    const userDoc = new userModel({
                        name,
                        email,
                        posisi,
                        phone,
                        password:hashedPassword
                    })

                    if(photo){
                        userDoc.photo.data = fs.readFileSync(photo.path)
                        userDoc.photo.contentType = photo.type
                    }
                    await userDoc.save();
                    res.status(201).send({
                        success:true,
                        message:"User created successfully",
                        userDoc
                    })
                    
                }catch{
                    console.log(error);
                    res.status(500).send({
                        success:false,
                        message:'Error created User',
                        error
                    })
                }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in creating new Users',
            error
        })
    }
}


export const userPhotoController = async (req,res) => {
    try {
        const {pid} = req.params;
        const product = await userModel.findOne({_id:pid}).select("photo");
        if(product.photo.data){
            res.set('Content-type', product.photo.contentType)
            res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting photo products',
            error
        })
    }
}

export const singleUserController = async (req,res) => {
    try {
        const {id} = req.params
        const userDoc = await userModel.findOne({_id:id}).select("-photo").select("-password")

        res.status(200).send({
            success:true,
            message:'Get single user succesfully',
            userDoc,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting single user',
            error
        })
    }
}

export const updateUserController = async (req,res) => {
    try {
     
        const {name,email,posisi,phone} = req.fields
        const {photo} = req.files

        // validation
        switch(true){
            case !name: return res.status(200).send({success:false, message: 'Name is required'});
            case !email: return res.status(200).send({success:false, message: 'email is required'});
            case !posisi: return res.status(200).send({success:false, message: 'posisi is required'});
            case !phone: return res.status(200).send({success:false, message: 'phone is required'});
            case photo && photo.size > 1000000: 
                return res.status(200).send({
                    success:false, message: 'Photo is required and should be less then 1mb'
                });
        }

        const userDoc = await userModel.findByIdAndUpdate(req.params.id,
            {...req.fields}, {new:true}
        );

        if(photo){
            userDoc.photo.data = fs.readFileSync(photo.path)
            userDoc.photo.contentType = photo.type
        }
        await userDoc.save();
        res.status(201).send({
            success:true,
            message:"User updated successfully",
            userDoc
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:true,
            message:"Error while update user",
            error
        })
    }
}

//delete product
export const deleteUserController = async (req,res) => {
    try {
        const {id} = req.params
        const userDoc = await userModel.findByIdAndDelete(id)

        res.status(200).send({
            success:true,
            message:'User deleted succesfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while delete User',
            error
        })
    }
}


export const updatedPasswordController = async (req,res) => {
    try {
        const {email,passwordOld,passwordNew} = req.body;
        
        if(!passwordOld){
            return res.send({message: 'Password old is required'})
        }
        if(!passwordNew){
            return res.send({message: 'New Password is required'})
        }

        //check user
        const user = await userModel.findOne({email})

        const match = await comparePassword(passwordOld,user.password)

        if(match){   
            const hashed = await hashPassword(passwordNew);
            await userModel.findByIdAndUpdate(user._id,{
                password:hashed
            });
            res.status(200).send({
                success:true,
                message:"Password reset successfully",
            });
        }else{
            return res.status(200).send({
                success:false,
                message:'Invalid password old',
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Something went wrong',
            error
        })
    }
}