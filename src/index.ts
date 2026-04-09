import express from "express";
import cors from "cors";
import authRoutes from "./routes";
import { AppDataSource } from "./config/data-source";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("DB Connected");

        app.listen(26, () => {
            console.log("Server running");
        });
    })
    .catch((err) => console.log(err));