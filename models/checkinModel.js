import mongoose from "mongoose";


const ChekinSchema = new mongoose.Schema(
  {
    user: {
      type:mongoose.ObjectId,
      ref: 'users',
    },
    checkIn: {type:Date, required:true},
  },
  {timestamps:true}
);

export default mongoose.model('checkIn',ChekinSchema)