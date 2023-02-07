import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
dotenv.config();

const app = express();
const PORT = 8000;
//middlewares

app.use(cors());
app.use(express.json());

app.use("/api/v1/post",postRoutes);
app.use("/api/v1/dalle",dalleRoutes);

app.get("/",async (req,res)=>{
    res.send("U came here");

})

try{
    connectDB(process.env.MONGO_DB_URL);
    app.listen(PORT, ()=>{
        console.log(`Application has started at port ${PORT}`);
    })
}catch(err){
    console.log("THere was an error while connecting to mongoDB: ",console.err);
}
