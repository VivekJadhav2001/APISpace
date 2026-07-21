import express from "express"
import { createBulkTodos, createTodo, deleteTodo, getAllTodos, getTodoById, toggleTodoDoneStatus, updateTodo } from "../../controllers/apps/todo/todo.controller.js"

const router = express.Router()

router.get("/allTodos",getAllTodos)
router.get("/getTodo/:todoId",getTodoById)
router.post("/insertManyTodos",createBulkTodos)
router.post("/createTodo",createTodo)
router.delete("/deleteTodo/:todoId",deleteTodo)
router.patch("/updateTodo/:todoId",updateTodo)
router.patch("/toggleTodo/:todoId",toggleTodoDoneStatus)



export default router