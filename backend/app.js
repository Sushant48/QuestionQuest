import express from "express";
import cors from "cors";


const app = express();

app.use(cors({
    origin: `${process.env.CORS_ORIGIN}`,
    credentials: true
}));

app.use(express.json({limit: "16kb"}));


import dataRoutes from "./routes/data.routes.js";

app.use("/api" , dataRoutes);

export default app;