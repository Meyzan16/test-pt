import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
        },
        posisi:{
            type:String,
        },
        phone:{
            type:String,
        },
        photo:{
            data:Buffer,
            contentType:String,
        },
        role:{
            type:Number,
            default:0,
        },
    },
    {timestamps:true}
)

export default mongoose.model('users',userSchema)