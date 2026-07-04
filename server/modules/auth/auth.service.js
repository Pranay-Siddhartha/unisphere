import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../users/user.model.js";

export const loginUser = async (loginData) => {
    loginData.username = loginData.username.trim().toLowerCase();
    const user = await User.findOne({
        username: loginData.username,
    }).select("+password");

    if (!user) {
        throw new Error("Invalid username or password");
    }

    const isPasswordValid = await bcrypt.compare(
        loginData.password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error("Invalid username or password");
    }

    const token = jwt.sign(
        {
            UserId: user._id,
            username: user.username,
            role: user.role
        },

        process.env.JWT_SECRET,

        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const { password, ...userResponse } = user.toObject();

    return {
        user: userResponse,
        token,
    }
};