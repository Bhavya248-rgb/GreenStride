import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';


//@desc Register User
//@route POST /api/auth/register
//@access public

const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password,10);

    // Create a verification token (e.g., JWT or a random token)
    const verificationToken = jwt.sign({email},process.env.ACCESS_TOKEN_SECRET,{expiresIn : "1h",});

    const user = await User.create({
        username,
        email,
        password:hashedPassword,
        verificationToken
    });
    if(user){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASSWORD,
            }
        });        
        
        const verificationUrl = `http://localhost:5000/api/auth/verify-email/${verificationToken}`;
    
        const mailOptions = {
            from : process.env.EMAIL_USER,
            to: user.email,
            subject: "Please verify your email to continue with GreenStride",
            text:`Click on the link to verify your email: ${verificationUrl}`,
        };
    
        try{
            await transporter.sendMail(mailOptions);
            console.log("Verification Email sent");
        }
        catch(error){
            console.error("Error sending email:",error);
            return res.status(500).json({ message: "Email not sent" });
            // throw new Error("Email not sent");
        }
    
        res.status(201).json({
            _id : user._id,
            username: user.username,
            email:user.email,
            message : "Registration successful,Please check your mail for verification",
        });
    }
    else{
        return res.status(400).json({ message: "Invalid user data" });
    }
})

// @desc loginUser
// @route POST/api/auth/login
// @access Public
const loginUser = asyncHandler(async(req,res)=>{
    const  {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const user = await User.findOne({email});
if(!user){
    return res.status(401).json("User doesn't exists");
}
 // Check if the email is verified
// if (!user.verified) {
    // return res.status(401).json({message:"Email not verified. Please verify your email before logging in."});
    // throw new Error("Email not verified. Please verify your email before logging in.");
// }
if(user && (await bcrypt.compare(password,user.password))){
    const accessToken = jwt.sign(
        {
            user:{
                username : user.username,
                email : user.email,
                id : user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : "1d",
        }
    );
    res.status(200).json({accessToken,user});
}
else{
    return res.status(401).json({message:"Invalid email or password"});
}
})

//@desc Verify User Email
//@route POST /api/auth/verify-email
//@access public
const verifyEmail = asyncHandler (async(req,res)=>{

    try{
        const {token} = req.params;
        console.log("Token from params:",token);
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const email = decoded.email;
        console.log("Decoded user email",email);

        if(!email){
            return res.status(400).json({message:"Invalid or expired token"});
        }
        // Find the user by email and update their email verification status
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.verified = true;
        await user.save();

        return res.status(200).json({ message: 'Email successfully verified!' });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

// @desc Forgot Password
// @route POST /api/auth/forgot-password
// @access Public
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Generate a **password reset token**
    const resetToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m", // Token expires in 15 minutes
    });

    // Save the token in the database (optional)
    user.resetPasswordToken = resetToken;
    await user.save();

    // Create reset password URL
    const resetUrl = `http://localhost:5000/api/auth/reset-password/${resetToken}`;

    // Send Email
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Password Reset Request",
        text: `Click on the following link to reset your password: ${resetUrl}\nThis link will expire in 15 minutes.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: "Reset link sent to your email" });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Email not sent" });
    }
});

// @desc Reset Password
// @route POST /api/auth/reset-password/:token
// @access Public
const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const email = decoded.email;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: "Password reset successful!" });
    } catch (error) {
        console.error("Reset Password Error:", error);
        return res.status(400).json({ message: "Invalid or expired token" });
    }
});


const currentUser = asyncHandler(async(req,res)=>{
    // res.json(req.user);
    const user = await User.findOne({email:req.user.email});
    res.json(user);
})

export default {registerUser,loginUser,currentUser,verifyEmail,forgotPassword,resetPassword};