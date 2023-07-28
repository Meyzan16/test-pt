import mongoose from "mongoose";


const CheckOutSchema = new mongoose.Schema(
  {
    user: {
      type:mongoose.ObjectId,
      ref: 'users',
    },
    checkOut: {type:Date, required:true},
  },
  {timestamps:true}
);

export default mongoose.model('checkOut',CheckOutSchema)