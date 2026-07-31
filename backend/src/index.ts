import express from "express";
import router from "../routes/userRoutes";
import dotenv from "dotenv"
import { startWsServer } from "./socket";
import cors from "cors";

dotenv.config() ;

const PORT = process.env.PORT || 12000

const app = express();
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(express.json());


app.use("/api/v1",router)



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


startWsServer();