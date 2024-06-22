// const express=require('express');
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
// import connectToMongoDb from "./db/connectToMongoDb.js";
import dbConnect from "./db/dbConnect.js";
import Message from "./models/messageModel.js";
import messageRoutes from "./routes/message.routes.js"
import cookieParser from "cookie-parser";
import uRoutes from "./routes/uRoutes.js"
// import userRoutes from "../BackEnd/routes/userRoutes.js"
const app=express();
// const dotenv=require("dotenv");
const PORT=process.env.PORT||5000;

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use("/api/messages",messageRoutes)
app.use("/api/auth",authRoutes)
// app.use("/api/users",userRoutes)
app.use("/api/users",uRoutes)
app.get("/",(req,res)=>{
    res.send("Hello World hanji");
})


app.listen(PORT,
     ()=> {
        // connectToMongoDb();
        dbConnect();
     console.log(`SErver running at Port  ${PORT}`)
    });