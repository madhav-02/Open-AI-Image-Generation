import mongoose, { mongo } from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery',true);  // Used for search functionality

    mongoose.connect(url)
    .then(()=>{console.log("Mongo DB Connected");})
    .catch(()=>{console.log("Error connecting to MongoDB");})
}

export default connectDB;