import express, { response } from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

router.get("/",(req,res)=>{
    res.send("THis is Dall - e");
})

router.post("/", async (req,res)=>{
    try{
        const {prompt} = req.body;
        const response = await openai.createImage({      // The strucutre of the post request is mentioned in its docs. See the docs.txt file.
            prompt,
            n:1,
            size:'1024x1024',
            response_format:"b64_json"
        });

        const image = response.data.data[0].b64_json;
        res.status(200).json({photo:image});
    }catch(error){
        console.log("Error while fetching the image: ",error);
        res.status(500).json("Error while creating Image")
    }
})

export default router;