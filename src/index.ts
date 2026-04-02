// const express = require("express");
// const cors = require("cors");
import express from "express";
import cors from "cors";
// const authRoutes = require("./routes/auth");
import authRoutes from "./routes/auth";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});