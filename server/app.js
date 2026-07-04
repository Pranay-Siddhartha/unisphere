import express from "express";
import userRoutes from "./modules/users/user.route.js";
const app = express();


app.use(express.json());
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Unisphere server is running !")
});

export default app;