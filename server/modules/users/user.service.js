import bcrypt from "bcrypt";
import User from "./user.model.js";

const SALT_ROUNDS = 10;

export const createUser = async (userData) => {
    // Normalize username
    userData.username = userData.username.trim().toLowerCase();

    // Check if username already exists
    const existingUser = await User.findOne({
        username: userData.username,
    });

    if (existingUser) {
        throw new Error("Username already exists");
    }

    userData.password = await bcrypt.hash(
        userData.password,
        SALT_ROUNDS
    );
    const user = new User(userData);
    return await user.save();
};

export const getUsers = async () => {
    return await User.find();
}

export const getUserById = async (id) => {
    return await User.findById(id);
};

export const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};