import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;


// import mongoose from "mongoose";
// import { getMessage } from "../controllers/message.controller.js";
// import { sendMessage } from "../controllers/message.controller.js";
// import express from "express"
// import protectRoute from "../middleware/protectRoute.js";
//  const router=express.Router();
// router.post("/send/:id",protectRoute,sendMessage)
// router.get("/:id",protectRoute,getMessage)

// export default router;