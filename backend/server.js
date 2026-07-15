import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";

dotenv.config();
const app=express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth",authRoutes)
app.use("/api/question",questionRoutes);
app.get("/",(req,res)=>{
    res.json({ message: 'Server is running' });
})

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})