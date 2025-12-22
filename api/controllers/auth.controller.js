import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {

  const { username, email, password } = req.body;

  try{

    
    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    
    // console.log(hashPassword);
    
    
    // Create a new user and save to db
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });
    
    console.log(newUser);
    
    res.status(201).json({message:"User created"})
  } catch(err) {
    console.log(err);
    res.status(500).json({message:"Failed to create user"}) 
  }
};

export const login = async (req, res) => {
  //db operations
  const { username, password } = req.body;

  try {
    
    // check if the user exists
    const user = await prisma.user.findUnique({
      where: { username:username}
    })

    if(!user) return res.status(401).json({ message:"Invalid Credentials " })
  
    // check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) return res.status(401).json({ message:" Invalid Credentials " })
  
    //generate cookie token and send to the user
    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")

    const age = 1000 * 60 * 60 * 24 * 7;
    
    const token = jwt.sign({
      id: user.id,
      username: user.username,
      isAdmin: false,
    }, process.env.JWT_SECRET_KEY, 
      { expiresIn: age }
    );

    const {password : userPassword, ...userInfo} = user
    
    res.cookie("token", token, {
      httponly: true,
      // secure: true,
      maxAge: age,
      
    }).status(200).json({...userInfo})

  } catch (error) {
    console.log(first);
    res.status(500).json({message:"failed to login"})
  }
}

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" })
}

