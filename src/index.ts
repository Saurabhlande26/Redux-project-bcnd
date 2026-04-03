import express from "express";
import cors from "cors";
import authRoutes from "./routes";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

app.listen(26, () => {
    console.log("Server running on port 5000");
});