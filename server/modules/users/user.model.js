import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    name: {
        type: String,
        required: true,
        trim: true

    },

    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        sparse: true,
    },

    password: {
        type: String,
        select: false,
        required: true
    },

    role: {
        type: String,
        enum: [
            "student",
            "faculty",
            "admin",
            "superadmin",
            "canteen",
            "placement"
        ],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true

    },
},

    {
        timestamps: true,
    }

);

userSchema.set("toJSON", {
    transform: ( doc,ret ) => {
        delete ret.password;
        delete ret.__v;
        return ret;
    },
});

const User = mongoose.model("User", userSchema);
export default User;