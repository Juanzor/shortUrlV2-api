import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import linkRoutes from "./routes/link.js";
import redirectRoutes from "./routes/redirect.js";

import "dotenv/config";
const whiteList = [process.env.ORIGIN1];

const app = express();
app.use(
    cors({
        origin: function (origin, callback) {
            if (whiteList.includes(origin)) {
                return callback(null, origin);
            }
            return callback("Error de CORS: " + origin + " no autorizado");
        },
    })
);

app.use(cookieParser());
app.use(express.json());

app.use("/", redirectRoutes); // <== Lado del backend
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/links", linkRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log("🚀🚀 http://localhost:" + PORT));
