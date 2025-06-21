import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username :{
            type : String,
            required : true
        },
        email :{
            type : String,
            required : true,
            unique : true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Enter a valid email address",
            ], // Regex to validate email format
        },
        password: {
            type: String,
            required: [true, "Enter a Strong Password:"],
        },
        verified: {
            type: Boolean,
            default: false, // Initially set to false until email is verified
        },
        verificationToken: {
            type: String, // Used to store a unique token for email verification
        },
        resetPasswordToken: {
            type: String, // Token for password reset functionality (if needed later)
        },
        resetPasswordExpires: {
            type: Date, // Expiry date for the reset password token
        }
    },
    {
        timestamps:true,
    }
);

const User = mongoose.model('User',userSchema);
export default User;