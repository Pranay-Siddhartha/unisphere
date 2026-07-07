import {
    createUser,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
} from "./user.service.js";


export const createUserController = async (req, res, next) => {
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

export const getUsersController = async (req, res, next) => {
    try {
        const users = await getUsers();
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

export const getUserByIdController = async (req, res, next) => {
    try {
        const user = await getUserById(req.params.id);
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUserController = async (req, res, next) => {
    try {
        await deleteUser(req.params.id);     
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }   
};

export const updateUserController = async (req, res, next) => {
    try {
        const updatedUser = await updateUser(
            req.params.id, 
            req.body
        );
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    }catch (error) {
        next(error);
    }
};