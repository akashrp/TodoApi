const express= require('express');
const { getAllTodo, createTodo, addTask, updateTodo, deleteTodo } = require('../Controllers/todoController');
const auth = require('../Middleware/authMiddleware');
const router= express.Router();

router.get("/getAlltodo", auth, getAllTodo);
router.post("/createTodo",auth, createTodo);
router.post("/addTask", auth,addTask);
router.post("/updateTodo",auth,updateTodo);
router.get("/deleteTodo",auth,deleteTodo);

module.exports=router;