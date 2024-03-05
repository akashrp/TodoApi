const Todo = require("../Model/todo");

exports.createTodo = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send("insufficent data");
    }
    const todo = await Todo.create({ name: name });
    if (todo) {
      return res.status(201).json(todo);
    }
    return res.status(500).send("server error");
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
};

exports.getAllTodo = async (req, res) => {
  try {
    const allTodos = await Todo.find();
    if (allTodos.length > 0) {
      return res.status(200).json(allTodos);
    }
    return res.status(200).json({});
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
};

exports.addTask = async (req, res) => {
  try {
    const { todoId, task } = req.body;
    if (!(todoId && task)) {
      return res.status(400).send("insufficent data");
    }
    const todo = await Todo.findById(todoId);
    if (todo) {
      todo.tasks.push(task);
      const updatedTodo = await todo.save();
      return res.status(200).json(updatedTodo);
    }
    return res.status(400).send("no todo found");
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { todoId, name } = req.body;
    if (!(todoId && name)) {
      return res.status(400).send("insufficent data");
    }
    const todo = await Todo.findByIdAndUpdate(
      todoId,
      { name: name },
      {
        new: true,
      }
    );
    if (todo) {
      return res.status(200).json(todo);
    }
    return res.status(500).send("server error");
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const  todoId  = req.query.todoId;
    if (!todoId) {
      return res.status(400).send("insufficent data");
    }
    const todo = await Todo.findByIdAndDelete(todoId);
    if (todo) {
      return res.status(200).json(todo);
    }
    return res.status(500).json("server error");
  } catch (error) {
    return res.status(500).json("server error");
  }
};
