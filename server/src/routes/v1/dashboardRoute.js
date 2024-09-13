import express from "express";
import DashboardController from "~/controllers/dashboardController";
import authorizedMiddleware from "../../middlewares/authMiddleware";

const router = express.Router();

router.use(authorizedMiddleware);
router.get("/access", DashboardController.access);

export default router;
