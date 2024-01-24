import express from "express";
import User from "../Schema/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const body = req.body;

    const user = await User.findOne({ username: body.username });
    if (user) {
      return res.status(409).json({ message: "Username already taken" });
    }
    const email = await User.findOne({ email: body.email });
    if (email) {
      return res.status(409).json({ message: "email already exists" });
    }

    const hashedPassword = await bcrypt.hash(body.password, 2);
    body.password = hashedPassword;

    await User.create(body);
    res.status(201).json({ message: "Signed up successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const passMatch = await bcrypt.compare(password, user.password);
    if (passMatch) {
      const token = jwt.sign(
        { userId: user._id, role: "User" },
        "asdfghjklpoiuytr"
      );
      return res.status(200).json({ token, userId: user._id, role: "User" });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
router.get("/user", async (req, res) => {
  try {
    const data = await User.find();
    console.log(data);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
router.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "user deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
