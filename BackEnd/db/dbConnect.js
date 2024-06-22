import mongoose from "mongoose";

const dbConnect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connect to MongoDB");
    }
    catch(error)
    {
        console.log("Error connecting to MOnog",error.messare)
    }
}

export default dbConnect;