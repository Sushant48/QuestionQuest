import {asyncHandler} from "../utils/asyncHandler.js";
import { Data } from "../models/data.model.js";

const searchQuestions = asyncHandler(async (req, res) => {
    const { query, type, page = 1, limit = 10 } = req.query;

    if (!query) {
        return res.status(400).json({ error: "Search query is required" });
      }
  
    const resultsPerPage = parseInt(limit);
    const skip = (page - 1) * resultsPerPage;
  
      const filter = {
        $text: { $search: query }, 
      };
  
      if (type) {
        filter.type = type; 
      }
  
      const results = await Data.find(filter).skip(skip).limit(resultsPerPage).sort({ score: { $meta: "textScore" } });;
  
      const totalResults = await Data.countDocuments(filter);
  
      res.status(200).json({
        results,
        totalResults,
        totalPages: Math.ceil(totalResults / resultsPerPage),
      });
  });


   const getAllQuestions = asyncHandler(async (req, res) => {
    const { type, page = 1, limit = 10 } = req.query;
  
    const resultsPerPage = parseInt(limit);
    const skip = (page - 1) * resultsPerPage;
  
      const filter = type ? { type } : {};
  
      const questions = await Data.find(filter).skip(skip).limit(resultsPerPage);
  
      const totalQuestions = await Data.countDocuments(filter);
  
      res.status(200).json({
        questions,
        totalQuestions,
        totalPages: Math.ceil(totalQuestions / resultsPerPage),
      });
  });
  
  
  const getQuestionById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const question = await Data.findById(id);
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }
  
      res.status(200).json(question);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch question details" });
    }
  })

  export {getQuestionById, searchQuestions, getAllQuestions};