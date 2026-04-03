import express from "express";
import { login, refresh } from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refresh);

router.get("/admin", authenticate, authorize("admin"), (req, res) => {
  res.json({ message: "Admin access granted" });
});

export default router;