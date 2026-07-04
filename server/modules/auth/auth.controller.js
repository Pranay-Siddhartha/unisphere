import { loginUser } from "./auth.service.js";

export const loginController = async (req,res) => {
    try {
        const result = await loginUser(req.body);
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: result,
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
}