import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;


// import express from "express"
// import { logout ,signup,sigmaup,login} from "../controllers/auth.controller.js";
// // import auth.controller.js from "../controller/auth.controller.js"
// const router=express.Router();

// // router.post("/login",(req,res)=>{
// //     res.send("Login Route")
// //     console.log("LOGIN");
// // });

// router.post("/logout",logout); 
// router.post("/login",login); 
// router.post("/signup",signup);
// router.post("/sigmaup",sigmaup);

// export default router;