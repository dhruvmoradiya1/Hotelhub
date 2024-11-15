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

 const connectToDatabase = async () => {
  const clusterURI = process.env.MONGODB_CONNECTION_STRING as string;
  const localURI = process.env.MONGODB_CONNECTION_STRING_LOCAL as string;

  try {
    console.log("Trying to connect to MongoDB Cluster...");
    await mongoose.connect(clusterURI); // Simplified connection
    console.log("MongoDB connected to Cluster Database");
  } catch (err) {
    console.error("Cluster connection failed. Trying to connect to Localhost MongoDB...");
    try {
      await mongoose.connect(localURI); // Simplified connection
      console.log("MongoDB connected to Localhost Database");
    } catch (localErr) {
      console.error("Failed to connect to both Cluster and Localhost MongoDB:", localErr);
      process.exit(1); // Exit the process with failure
    }
  }
};

connectToDatabase(); 
 

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