import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { UserRouter, ProductRouter } from "./routers/Routers.js";
import connectDB from "./config/db.js";
import Authorization from "./middleWares/Authorization.js";
import { ProductModel } from "./models/models.js";

// Load environment variables
dotenv.config();



// Initialize express app
const app = express();

// For ES modules, get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
connectDB();

// Serve uploaded images as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/products",Authorization, ProductRouter);
app.use("/api/users", UserRouter);


// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
