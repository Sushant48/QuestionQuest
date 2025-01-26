import { Router } from "express";
import { getQuestionById, searchQuestions, getAllQuestions } from "../controllers/data.controller.js";

const router = Router();


router.route("/search").get(searchQuestions);

router.route("/questions").get(getAllQuestions);

router.get("/questions/:id", getQuestionById);

export default router;