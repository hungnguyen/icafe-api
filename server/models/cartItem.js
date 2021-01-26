import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  cartId: mongoose.Types.ObjectId,
  foodId: mongoose.Types.ObjectId,
  foodName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  amount: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
});

cartItemSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.price = ret.price.toString();
    ret.amount = ret.amount.toString();
    return ret;
  },
});

export default mongoose.model("CartItem", cartItemSchema);
