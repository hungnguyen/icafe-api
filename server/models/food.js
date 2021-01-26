import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const foodSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  categoryId: mongoose.Types.ObjectId,
  price: {
    type: mongoose.Types.Decimal128,
    default: 0,
  },
});

foodSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.price = ret.price.toString();
    return ret;
  },
});

export default mongoose.model("Food", foodSchema);
