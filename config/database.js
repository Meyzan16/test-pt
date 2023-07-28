import mongoose from 'mongoose';
import colors from 'colors';
let isConnected = false; // track the connection

const  connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "next_test",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true;

    console.log(`Connect to mongodb database ${conn.connection.host}`.bgMagenta.white)
  } catch (error) {
    console.log(`Error in  mongodb ${error}`. bgRed.white)
  }
}

export default connectToDB;