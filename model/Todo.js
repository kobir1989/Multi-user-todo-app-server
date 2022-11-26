const { Schema, model } = require("mongoose");
const User = require("./User")

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
    user:{
      type: Schema.Types.ObjectId,
      require:true,
      ref: User,
    }
  },
  {
    timestamps: true,
  }
);

const Todo = model("Todo", todoSchema);
module.exports = Todo;
