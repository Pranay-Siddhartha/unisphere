import express from "express";
import { createUserController } from "./user.controller.js";
import { 
    verifyToken, 
    authorizeRoles } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post(
    "/",
    verifyToken,
    authorizeRoles("superadmin", "admin"),
    getAllUsersController
);

export default router;