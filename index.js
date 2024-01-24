import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

router.use(express.static("Uploads"));

app.use(express.json());

app.use(router);

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log("connected to DB");
});

app.use("*", (req, res) => {
  res.status(404).send("No routes found");
});

app.listen(port, () => {
  console.log("app is running @ localhost:5000");
});
