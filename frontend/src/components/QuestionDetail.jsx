import React, { useState } from "react";

const QuestionDetail = ({ question, onClose }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleMCQSubmit = (selectedOption) => {
    const isCorrect = selectedOption.isCorrectAnswer;
    setFeedback(isCorrect ? "Correct!" : "Incorrect!");
  };

  const handleAnagramSubmit = () => {
    const correctAnswer = question.blocks
      .filter((block) => block.isAnswer)
      .map((block) => block.text)
      .join(" ");

    setFeedback(userAnswer.toLowerCase() === correctAnswer.toLowerCase() ? "Correct!" : "Incorrect!");
  };

  return (
    <div className="question-detail">

      <h2>{question.title}</h2>

      {question.type === "MCQ" && (
        <div>

          {question.options.map((option, index) => (
            <button key={index} onClick={() => handleMCQSubmit(option)}>
              {option.text}
            </button>
          ))}

        </div>
      )}

      {question.type === "ANAGRAM" && (
        <div>

          <p>Rearrange the blocks to form a word:</p>

          <div>
            {question.blocks.map((block, index) => (
              <span key={index}>{block.text + " " }</span>
            ))}
          </div>
          
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer"
          />
          <button onClick={handleAnagramSubmit}>Submit</button>
        </div>
      )}

      {["CONTENT_ONLY", "READ_ALONG"].includes(question.type) && (
        <div>
          <p>{question.title}</p>
        </div>
      )}

      {feedback && <p>{feedback}</p>}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default QuestionDetail;
