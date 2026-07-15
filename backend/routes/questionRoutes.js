import  express from "express";
import protect from "../middleware/authmiddleware.js";
import { addQuestion, getAllQuestion, getQuestion } from "../controllers/questionController.js";

const router=express.Router();

router.post("/add", addQuestion);
router.get("/random",protect,getQuestion);
router.get("/all",protect,getAllQuestion);

export default router
