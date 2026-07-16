import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import attemptRoutes from "./routes/attemptRoutes.js";
import cookieParser from "cookie-parser";


const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

connectDB();

app.use("/api/auth",authRoutes)
app.use("/api/question",questionRoutes);
app.use('/api/attempts', attemptRoutes);
app.get("/",(req,res)=>{
    res.json({ message: 'Server is running' });
})

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})