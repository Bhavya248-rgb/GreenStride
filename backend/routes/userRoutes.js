import express from 'express';
import userController from "../controllers/userController.js";
import validateToken from '../middlewares/validateTokenHandler.js';

const router = express.Router();

router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);
router.route("/current").get(validateToken,userController.currentUser);
router.route("/verify-email/:token").post(userController.verifyEmail);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password/:token", userController.resetPassword);

export default router;