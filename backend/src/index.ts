import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import myHotelRoutes from "./routes/my-hotels";
import hotelRoutes from "./routes/hotels";
import myProfileRoutes from "./routes/my-profile";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string || process.env.MONGODB_CONNECTION_STRING_LOCAL as string)
 .then(() => console.log("MongoDB connected With Clusters Database"))
 .catch((err) => console.log("Failed to connect to MongoDB:",err));

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || process.env.FRONTEND_URL_AWS || process.env.FRONTEND_URL_LOCALHOST,
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Server is up and running, MongoDB is connected, and we're live on the web! 🌐");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-profile", myProfileRoutes);

app.listen(3000, '0.0.0.0', () => {
  console.log("server running on localhost: http://localhost:3000 🚀");
});