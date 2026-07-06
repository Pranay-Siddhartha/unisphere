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
        next(error);
    }
};

export const getAllUsersController = async (req,res,next) => {
    try {
        const users = await getUsers();
        res.status(200).json({
            success: true,
            data:true,
        });
    } catch (error) {
        next(error);
    }
};
