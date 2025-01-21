import { Router } from "express";
import { searchQuestions, getAllQuestions } from "../controllers/data.controller.js";

const router = Router();


router.route("/search").get(searchQuestions);

router.route("/questions").get(getAllQuestions);



export default router;