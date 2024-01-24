import { Schema, model } from "mongoose";

const categorySchema = Schema({
  name: {
    type: String,
    required: true,
  },
});

const Category = model("Category", categorySchema);

export default Category;
