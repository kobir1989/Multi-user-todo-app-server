const { Schema, model } = require("mongoose");

const todoSchema = Schema(
  {
    title: {
      type: String,
      require: true,
    },
    todo: {
      type: String,
      require: true,
    },
  },
  {
    timeStamps: true,
  }
);

const Todo = model("Todo", todoSchema);
module.exports = Todo;
