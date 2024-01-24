import { Schema, model } from "mongoose";

const userSchema = Schema({
  username: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

const User = model("User", userSchema);

export default User;
