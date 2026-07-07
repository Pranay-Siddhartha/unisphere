import dotenv from "dotenv";
import mongoose from "mongoose";

import { createUser } from "../modules/users/user.service.js";

dotenv.config();
console.log(process.env.MONGODB_URI);


const seedSuperAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);

        // Create the superadmin using the existing service
        const user = await createUser({
            name: "Super Admin",
            username: "superadmin",
            password: "SuperAdmin@123",
            role: "superadmin",
        });

        console.log("✅ Superadmin created successfully!");
        console.log(user);
    } catch (error) {
        console.error("❌ Failed to seed superadmin:");
        console.error(error.message);
    } finally {
        // Close the MongoDB connection
        await mongoose.connection.close();
        console.log("🔌 MongoDB connection closed.");
    }
};

seedSuperAdmin();