import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// this will give us a way to send a use a web token that they can use for authorization
import User from "../models/User.js";

/* REGISTER USER */

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordhash = await bcrypt.hash(password, salt);
    // so now fyi , when the user wants to log in they will provide us
    // a password , we'll salt it and make sure the password is correct and then
    // we will give them a jwt token, this will be done in register function
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordhash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser); // 201 means sth was created successfully
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGINg IN */

export const login = async (req, res) => {
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email: email})
        if (!user){
            res.status(400).json({msg:"user does not exist"})
        }

        const isMatch = bcrypt.compare(password,user.password)
        
        if (!isMatch){
            res.status(400).json({msg: "Invalid credentials"})
        }

        const token = jwt.sign({id: user._id }, process.env.JWT_SECRET)
        delete user.password; 
        // deleteing the user password so it doesn't get sent to the frontend 

        res.status(200).json({token,user})
    
    } catch (err) {
        res.status(500).json({ error: err.message });
   
    }
}
