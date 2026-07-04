import {
    createUser,
    getUsers,
    getUserById,
    deleteUser,
} from "./user.service.js";


export const createUserController = async (req,res) => {
    try {
        const user = await createUser(req.body);
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        })
    } catch (error) {
        return res.status(400).json({
            success : false,
            message : error.message,
        });
    }
};