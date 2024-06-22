import mongoose from "mongoose";
import { getMessage } from "../controllers/message.controller.js";
import { sendMessage } from "../controllers/message.controller.js";
import express from "express"
import protectRoute from "../middleware/protectRoute.js";
 const router=express.Router();
router.post("/send/:id",protectRoute,sendMessage)
router.get("/:id",protectRoute,getMessage)

export default router;