import { Schema, model } from "mongoose";

const adminSchema = Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
});

const Admin = model("Admin", adminSchema);

export default Admin;
