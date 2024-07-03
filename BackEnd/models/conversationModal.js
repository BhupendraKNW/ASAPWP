import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
	{
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message",
				default: [],
			},
		],
	},
	{ timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;

// import jwt from "jsonwebtoken";
// import User from "../models/umodel.js";

// const protectRoute = async (req, res, next) => {
// 	try {
// 		const token = req.cookies.jwt;

// 		if (!token) {
// 			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
// 		}

// 		const decoded = jwt.verify(token, process.env.JWT_SECRET);

// 		if (!decoded) {
// 			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
// 		}

// 		const user = await User.findById(decoded.userId).select("-password");

// 		if (!user) {
// 			return res.status(404).json({ error: "User not found" });
// 		}

// 		req.user = user;

// 		next();
// 	} catch (error) {
// 		console.log("Error in protectRoute middleware: ", error.message);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// };

// export default protectRoute;
// // import mongoose from "mongoose";
// // const conv=new mongoose.Schema({
// //     participants:[
// //         {
// //             type: mongoose.Schema.Types.ObjectId,
// //             ref:"User",
// //         },
// //     ],
// //     messages:[
// //         {
// //             type: mongoose.Schema.Types.ObjectId,
// //             ref:"Message",
// //             default:[],
// //         }
// //     ]
// // },
// // {timestamps:true}
// // );

// // const Conversation=mongoose.model("Conversation",conv);
// // export default Conversation