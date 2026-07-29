import express from "express";
import router from "./routes/userRoutes";
import dotenv from "dotenv"
import { Request , Response } from "express";

dotenv.config() ;
const PORT = process.env.PORT || 12000

const app = express();
app.use(express.json());

app.get("/", ( req:Request , res:Response)=>{
    res.send ("helllo")
})
app.use("/api/v1",router)



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});