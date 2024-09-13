import express from "express";
import UserController from "~/controllers/userController";

const router = express.Router();

// API đăng nhập.
router.post("/login", UserController.login);

// API Refresh Token - Cấp lại Access Token mới.
router.put("/refresh_token", UserController.refreshToken);

// API đăng xuất.
router.delete("/logout", UserController.logout);


export default router;
