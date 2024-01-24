import { Schema, model } from "mongoose";

const productSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  Image: String,
  price: {
    type: Number,
    required: true,
  },
  brand: String,
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  instock: {
    type: Boolean,
    default: true,
  },
  quantity: { type: Number, default: 10 },
});

const Product = model("Product", productSchema);

export default Product;
