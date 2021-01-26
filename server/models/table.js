import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const tableSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  floor: {
    type: Number,
    required: true,
  },
  using: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Table", tableSchema);
