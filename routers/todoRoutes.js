const router = require("express").Router();
const Todo = require("../model/Todo");

//Todo GET endpoint
router.get("/todos", async (req, res) => {
  try {
    const allTodos = await Todo.find();
    res.status(200).json(allTodos);
  } catch (error) {
    res.status(500).json({ errorMessage: "Something went wrong" });
  }
});

//Todo POST endpoint
router.post("/todos", async (req, res) => {
  const { title, todo } = req.body;
  console.log(req.user);
  try {
    if (!(title && todo)) {
      return res.status(400).json({ errorMessage: "All the feilds are required" });
    }
    const newTodo = new Todo({
      title,
      todo,
      user: req.user,
    });
    const todos = await newTodo.save();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ errorMessage: "Something went wrong" });
    console.log(error);
  }
});

//Todo DELETE endpoint
router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findTodo = await Todo.findOne({ id });
    if (!findTodo) {
      return res.status(401).json({ errorMessge: "Todo does not exists" });
    }
    await findTodo.delete();
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ errorMessage: "Something went wrong" });
  }
});

//Todo PUT endpoint
router.put("/todos/:id", async (req, res) => {
  const { title, todo } = req.body;
  console.log("PUT",title, todo)
  const { id } = req.params;
  try {
    if (!(title && todo)) {
      return res.status(401).json({ errorMessge: "All the feilds are required" });
    }
    const originalTodo = await Todo.findOne({ id });
    if (!originalTodo) {
      return res.status(401).json({ errorMessge: "Todo does not exists" });
    }
    originalTodo.title = title;
    originalTodo.todo = todo;
    const updatedTodo = await originalTodo.save();
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ errorMessage: "Something went wrong" });
    console.log(error)
  }
});

module.exports = router;
