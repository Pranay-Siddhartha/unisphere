import express from "express";
import { createUserController } from "./user.controller.js";

const router = express.Router();

router.post("/",createUserController);

export default router;