const mongoose = require("mongoose");
const recordSchema = new mongoose.Schema({
  amount: Number,
  type: {
    type: String,
    enum: ["income", "expense"],
  },
  category: String,
  date: Date,
  note: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Record", recordSchema);
