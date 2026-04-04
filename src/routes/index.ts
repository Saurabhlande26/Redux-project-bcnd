import express from "express";
import { login, refresh } from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todoController";

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refresh);

router.get("/todos", getTodos);
router.post("/todos", addTodo);
router.delete("/todos/:id", deleteTodo);
router.put("/todos/:id", updateTodo);

router.get("/admin", authenticate, authorize("admin"), (req, res) => {
  res.json({ message: "Admin access granted" });
});

export default router;