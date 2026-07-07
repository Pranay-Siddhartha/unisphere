import bcrypt from "bcrypt";
import User from "./user.model.js";
import ApiError from "../../utils/apiError.js";
import { normalizeUserData } from "../../utils/user.utils.js";

const SALT_ROUNDS = 10;

// helper function to check for duplicates
const checkDuplicate = async (field, value) => {
    const exists = await User.exists({
        [field]: value,
    });

    if (exists) {
        throw new ApiError(
            409,
            `${field} already exists`
        );
    }
};

// Create a new user
export const createUser = async (userData) => {
    // Normalize user data
    userData = normalizeUserData(userData);

    // Check unique fields
    await checkDuplicate("username", userData.username);

    if (userData.email) {
        await checkDuplicate("email", userData.email);
    }

    // Hash password
    userData.password = await bcrypt.hash(
        userData.password,
        SALT_ROUNDS
    );

    const user = new User(userData);

    return await user.save();
};

// Get all users
export const getUsers = async () => {
    return await User.find();
};

// Get user by ID
export const getUserById = async (id) => {
    const user = await User.findById(id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
};

// Delete user by ID
export const deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
};

export const updateUser = async (id, updateData) => {
    const user = await User.findById(id).select(
        "username email"
    );

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Normalize input data
    updateData = normalizeUserData(updateData);

    // Username uniqueness
    if (
        updateData.username &&
        updateData.username !== user.username
    ) {
        await checkDuplicate(
            "username",
            updateData.username
        );
    }

    // Email uniqueness
    if (
        updateData.email &&
        updateData.email !== user.email
    ) {
        await checkDuplicate(
            "email",
            updateData.email
        );
    }

    // Hash password if provided
    if (updateData.password) {
        updateData.password = await bcrypt.hash(
            updateData.password,
            SALT_ROUNDS
        );
    }

    return await User.findByIdAndUpdate(
        id,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    );
};