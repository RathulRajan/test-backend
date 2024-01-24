import express from "express";
import adminRoutes from "./adminRoutes.js";
import imageRoutes from "./image-routes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();

router.use(adminRoutes);
router.use(imageRoutes);
router.use(userRoutes);

export default router;
