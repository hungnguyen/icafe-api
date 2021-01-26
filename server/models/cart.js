import mongoose from "mongoose";

mongoose.Promise = global.Promise;

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

const cartSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  dateTime: {
    type: Date,
    default: new Date(),
  },
  tableId: mongoose.Types.ObjectId,
  tableName: {
    type: String,
  },
  totalAmount: {
    type: mongoose.Types.Decimal128,
    default: 0,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  items: [cartItemSchema],
});

cartSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.totalAmount = ret.totalAmount.toString();
    return ret;
  },
});

export default mongoose.model("Cart", cartSchema);
