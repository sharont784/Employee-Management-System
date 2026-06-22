import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { ClockInOut, getAttendance } from "../controllers/attendanceController.js";

const attendanceRouter = Router();

attendanceRouter.post("/",protect, ClockInOut)
attendanceRouter.get("/", protect, getAttendance)

export default attendanceRouter;


