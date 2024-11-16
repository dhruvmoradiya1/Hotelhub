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

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// MongoDB connection
const connectToDatabase = async () => {
  const clusterURI = process.env.MONGODB_CONNECTION_STRING as string;
  const localURI = process.env.MONGODB_CONNECTION_STRING_LOCAL as string;

  try {
    console.log("Trying to connect to MongoDB Cluster...");
    await mongoose.connect(clusterURI);
    console.log("MongoDB connected to Cluster Database");
  } catch (err) {
    console.error("Cluster connection failed. Trying to connect to Localhost MongoDB...");
    try {
      await mongoose.connect(localURI);
      console.log("MongoDB connected to Localhost Database");
    } catch (localErr) {
      console.error("Failed to connect to both Cluster and Localhost MongoDB:", localErr);
      process.exit(1); // Exit the process if connection fails
    }
  }
};

connectToDatabase();

// Initialize express app
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!process.env.FRONTEND_URL || !process.env.FRONTEND_URL_AWS) {
  throw new Error('Both FRONTEND_URL and FRONTEND_URL_AWS environment variables must be defined.');
}

// Apply the CORS middleware with the allowed origins
app.use(
  cors({
    origin: [ 
      process.env.FRONTEND_URL, 
      process.env.FRONTEND_URL_AWS
    ],
    credentials: true,
  })
);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Server is up and running, MongoDB is connected, and we're live on the web! 🌐");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-profile", myProfileRoutes);

// Start the server
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on http://localhost:3000 🚀");
});
