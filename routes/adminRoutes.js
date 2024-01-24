import express from "express";
import Category from "../Schema/categorySchema.js";
import Product from "../Schema/productSchema.js";
import Admin from "../Schema/adminSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// category

router.post("/category", async (req, res) => {
  try {
    await Category.create(req.body);
    res.status(201).json({ message: "category added Successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/category", async (req, res) => {
  try {
    const data = await Category.find();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/category/:id", async (req, res) => {
  try {
    const data = await Category.findById(id);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/category/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "category deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// product

router.post("/product", async (req, res) => {
  try {
    await Product.create(req.body);
    res.status(201).json({ message: "product added Successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/product", async (req, res) => {
  try {
    const data = await Product.find().populate("category");
    console.log(data);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/product/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "product deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.patch("/product/:id", async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  try {
    await Product.findByIdAndUpdate(id, updateData);
    res.status(200).json({ message: "product updated successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// ...

router.get("/product/category/:categoryId", async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const data = await Product.find({ category: categoryId });
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// admin
router.post("/admin/register", async (req, res) => {
  const body = req.body;
  const hashedPassword = await bcrypt.hash(body.password, 2);
  const postAdmin = await Admin.create({
    ...body,
    password: hashedPassword,
  });
  res.status(200).json({ message: "creds added Successfully" });
});

router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const passMatch = await bcrypt.compare(password, user.password);
    if (passMatch) {
      const token = jwt.sign(
        { userId: user._id, role: "Admin" },
        "asdfghjklpoiuytr"
      );
      return res.status(200).json({ token, userId: user._id, role: "Admin" });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

export default router;
