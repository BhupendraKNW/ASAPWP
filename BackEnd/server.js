import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

// import connectToMongoDB from "./db/connectToMongoDB.js";
import dbConnect from "./db/dbConnect.js"
import { app, server } from "./socket/socket.js";

dotenv.config();

const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;
// const __dirname
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
	// connectToMongoDB();
    dbConnect();
	console.log(`Server Running on port ${PORT}`);
});


// // const express=require('express');
// import express from "express";
// import dotenv from "dotenv";
// import authRoutes from "./routes/auth.routes.js";
// // import connectToMongoDb from "./db/connectToMongoDb.js";
// import dbConnect from "./db/dbConnect.js";
// import Message from "./models/messageModel.js";
// import messageRoutes from "./routes/message.routes.js"
// import cookieParser from "cookie-parser";
// import uRoutes from "./routes/uRoutes.js"
// // import userRoutes from "../BackEnd/routes/userRoutes.js"
// const app=express();
// // const dotenv=require("dotenv");
// const PORT=process.env.PORT||5000;

// dotenv.config();
// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/messages",messageRoutes)
// // app.use("/api/auth",authRoutes)

// app.use("/api/users",uRoutes)
// app.get("/",(req,res)=>{
//     res.send("Hello World hanji");
// })


// app.listen(PORT,
//      ()=> {
//         // connectToMongoDb();
//         dbConnect();
//      console.log(`SErver running at Port  ${PORT}`)
//     });