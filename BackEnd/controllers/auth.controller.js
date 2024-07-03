import bcrypt from "bcryptjs";
import User from "../models/umodel.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// https://avatar-placeholder.iran.liara.run/

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

		if (newUser) {
			// Generate JWT token here
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};


// // import User from "../models/user.model.js";
// import User from "../models/umodel.js"
// import bcrypt from "bcryptjs"
// import generateTokenAndSetCokie from "../utils/generateToken.js";
// export const signup = async(req,res)=>{
//    try{
//     const {fullName,password,confirmPassword,gender,userKaNam}=req.body;
//     if(password !== confirmPassword)
//         {
//             return res.status(400).json({error:"Password don't match"})
//         }
//     // const user=await User.findOne({userKaNam});
//     const userExist=await User.findOne({userKaNam});
//     if(userExist==userKaNam){
//         return res.status(400).json({error:"Username already exists"});
//     }
//     else{

     

//         const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${userKaNam}`
//         const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${userKaNam}`
        
//         await User.create({fullName,password,gender,userKaNam,  profilePic: gender=="male" ? boyProfilePic : girlProfilePic});
//         res.status(201).json({
//             _id: User._id,
//             fullName:User.fullName,
//             userKaNam:User.userKaNam,
//             // usersname:newUser.usersname,
//             profilePic:User.profilePic
//         });
//     }


//     //hash
//     //https://avatar-placeholder.iran.liara.run/
   
//     // const newUser=new User({
//     //     fullName,
//     //     userKaNam,
//     //     password,
//     //     gender,
//     //     profilePic: gender=="male" ? boyProfilePic : girlProfilePic
//     // })
//     // await newUser.save();
//     // res.status(201).json({
//     //     _id: newUser._id,
//     //     fullName:newUser.fullName,
//     //     userKaNam:newUser.userKaNam,
//     //     // usersname:newUser.usersname,
//     //     profilePic:newUser.profilePic
//     // });

// } catch(error){
//     console.log("Error in sign up controller ",error.message);
//     res.status(500).json({error:"Internal Server Error"});
// }
// }
// export const login = async(req,res)=>{
//     try{
// const {username,password}=req.body;
// const user=await User.findOne({username});
// const isPasswordCorrect=await bcrypt.compare(password,user?.password || "" );

// if(!user || !isPasswordCorrect){
//     return res.status(400).json({error:"Invalid credentials"})
// }
// generateTokenAndSetCokie(user._id,res);
// res.status(200).json({
//     _id: user._id,
//     fullName:user.fullName,
//     username:user.username,
//     profilePic:user.profilePic,
// })
//     } 
//     catch(error){

//         console.log("loginUser err",error.message);
//         res.status(500).json({error:"internal server error"})
//     }
// }
// export const logout = (req,res)=>{
//     // console.log("slogoutUser");
//     try{
// res.cookie("jwt","",{maxAge:0})
// res.status(200).json({message:"Logged out successfully"})
//     } catch(error){

//         console.log("loginUser err",error.message);
//         res.status(500).json({error:"internal server error"})
//     }
// }
// export const sigmaup=async(req,res)=>{
//     try{
// const {fullName,username,password,confirmPassword,gender}=req.body;
//         if(password !== confirmPassword)
//         {
//             return res.status(400).json({error:"Password don't match cc"})
//         }
//         const user=await User.findOne({username})
//         if(user){
//             return res.status(400).json({error:"UserName already exixst"})
//         }
//         //
//         const salt =await bcrypt.genSalt(10)
//         const hashedPassword=await bcrypt.hash(password,salt)
//         //
//         const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`
//         const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`

//         const newUser=new User({
//             fullName,
//             username,
//             password: hashedPassword,
//             gender,
//             profilePic: gender==="male" ? boyProfilePic: girlProfilePic
//         })
//         if(newUser){
//             generateTokenAndSetCokie(newUser._id,res);
//             await newUser.save();
//             res.status(201).json({
//                 _id: newUser._id,
//                 fullName:newUser.fullName,
//                 username:newUser.username,
//                 profilePic:newUser.profilePic,
//                 password:newUser.password
    
//             })
//         }
//     }
//     catch(error){
//         console.log("Eror in sigma ups ",error.message);
//         res.status(500).json({error:"inter sigma server errr"})
//     }

// }