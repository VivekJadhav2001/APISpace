import { todo } from "node:test";
import Todo from "../../../models/apps/todos/todo.model.js";

const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();

    if (todos.length === 0) {
      return res.success(404, "No Todos Found");
    }

    return res.success(200, "Fetched All Todos", todos);
  } catch (error) {
    next(error);
  }
};

const getTodoById = async (req, res, next) => {
  try {
    const { todoId } = req.params;

    if (!todoId) {
      return res.error(400, "Please Provide Todo Id");
    }

    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.error(404, "No Todo Found");
    }

    return res.success(200, "Todo Details Fetched Successfully", todo);
  } catch (error) {
    next(error);
  }
};

const createBulkTodos = async (req, res, next) => {
  try {
    const todos = req.body;
    console.log(req.body);
    if (!Array.isArray(req.body) || req.body.length === 0) {
      return res.error(400, "Please provide a non-empty todos array.");
    }

    const bulkTodo = await Todo.insertMany(todos);

    return res.success(200, "Inserted Many Todo Records");
  } catch (error) {
    next(error);
  }
};
const createTodo = async (req, res, next) => {
  try {
    const todo = req.body;

    if (!todo) {
      return res.error(400, "Please Provide Todo");
    }

    const todoDetails = await Todo.create({ ...todo });

    return res.success(201, "Created Todo Successfully", todoDetails);
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;

    if (!todoId) {
      return res.error(400, "Please provide Todo ID");
    }

    const todo = await Todo.findByIdAndUpdate(todoId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.error(404, "No Todo found");
    }

    return res.success(200, "Todo updated successfully", todo);
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;

    if (!todoId) {
      return res.error(400, "Please Provide Todo Id");
    }

    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    return res.success(200, "Deleted Todo Successfully");
  } catch (error) {
    next(error);
  }
};

const toggleTodoDoneStatus = async (req, res, next) => {
  try {
    const { todoId } = req.params;

    if (!todoId) {
      return res.error(400, "Please provide Todo ID");
    }

    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.error(404, "No Todo found with this ID");
    }

    todo.completed = !todo.completed;

    await todo.save();

    return res.success(
      200,
      `Todo marked as ${todo.completed ? "completed" : "incomplete"}.`,
      todo,
    );
  } catch (error) {
    next(error);
  }
};

export {
  getAllTodos,
  getTodoById,
  createTodo,
  createBulkTodos,
  updateTodo,
  deleteTodo,
  toggleTodoDoneStatus,
};
