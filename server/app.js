import express from "express";
import userRoutes from "./modules/users/user.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import {errorHandler} from "./middleware/error.middleware.js";

const app = express();


app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
    res.send("Unisphere server is running !")
});


app.use(errorHandler);

export default app;