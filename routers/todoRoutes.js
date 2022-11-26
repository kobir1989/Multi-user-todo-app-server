const router = require("express").Router();
const Todo = require("../model/Todo");

router.get("/todos", (req, res) => {});

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

router.delete("/todos/:id", (req, res) => {});

router.put("/todos/:id", (req, res) => {});

module.exports = router;
