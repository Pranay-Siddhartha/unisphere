import express from "express";
import { 
    createUserController,
    getUsersController,
    getUserByIdController,
    updateUserController,
 } from "./user.controller.js";
import { 
    verifyToken, 
    authorizeRoles } from "../../middleware/auth.middleware.js";

const router = express.Router();

// Create user route
router.post(
    "/",
    verifyToken,
    authorizeRoles("superadmin", "admin"),
    createUserController
);

// Get all users route
router.get(
    "/",
    verifyToken,
    authorizeRoles("superadmin", "admin"),
    getUsersController
);

// Get user by ID route
router.get(
    "/:id",
    verifyToken,
    authorizeRoles("superadmin", "admin"),
    getUserByIdController
)

// Update user by ID route
router.patch(
    "/:id",
    verifyToken,
    authorizeRoles("superadmin", "admin"),
    updateUserController
);

// Delete user by ID route
router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("superadmin", "admin"),
    deleteUserController
);


export default router;