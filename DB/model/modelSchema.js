import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  address: String,
  age: Number,
  phoneNumber: Number,
  avatar: String,
  createdAt: String,
});

const productSchema = new Schema({
  timestamp: { type: Date, default: Date.now() },
  title: String,
  description: String,
  code: Number,
  price: Number,
  stock: Number,
  category: String,
  thumbnail: String,
});
productSchema._id = new mongoose.Types.ObjectId();

const cartSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  username: String,
  products: Array,
  address: String,
});

const orderSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  products: Array,
  username: String,
  address: String,
  ordernumber: Number,
  state: { type: String, default: "generada" },
});

const chatSchema = new Schema({
  username: String,
  type: { type: String, default: "user" },
  timestamp: { type: Date, default: Date.now },
  body: String,
});

const userModel = model("User", userSchema);
const productModel = model("Product", productSchema);
const cartModel = model("Cart", cartSchema);
const orderModel = model("Order", orderSchema);
const chatModel = model("Chat", chatSchema);

export { userModel, productModel, cartModel, orderModel, chatModel };
