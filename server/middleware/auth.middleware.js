import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(
            new ApiError(
                401,
                "Access denied. No token provided."
            )
        );
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user = decoded;
        next();
    } catch (error) {
        return next(
            new ApiError(
                401,
                "Access denied. Invalid token."
            )
        );
    }

}

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ApiError(
                    403,
                    "Access denied. You do not have permission to perform this action."
                )
            );
        }
        next();
    };
}