const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    task: String,
    mark: String,
  },
  { collection: "Todo" }
);

module.exports = mongoose.model("Todo", TodoSchema);
