import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import verifyToken from "../middleware/auth";
import bcrypt from "bcryptjs";

const router = express.Router();

// Get user profile
router.get("/profile", verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Update user profile
router.put(
  "/profile",
  verifyToken,
  [
    check("firstName", "First Name is required").optional().isString(),
    check("lastName", "Last Name is required").optional().isString(),
    check("email", "Email is required").optional().isEmail(),
    check("password", "Password with 6 or more characters required")
      .optional()
      .isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const userId = req.userId;
    const { firstName, lastName, email, password } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
      if (password) user.password = await bcrypt.hash(password, 8);

      await user.save();

      res.json({ message: "Profile updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;