import React from "react";

const QuestionList = ({
  results,
  onSelectQuestion,
  handlePage,
  totalPages,
  currentPage,
}) => {

  return (
    <div className="question-list">
      {results.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        results.map((question) => (
          <div
            key={question._id}
            className="question-item"
            onClick={() => onSelectQuestion(question._id)}
          >
            <h3>{question.title}</h3>
            <p>Type: {question.type}</p>
          </div>
        ))
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePage("prev")}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePage("next")}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
  
};

export default QuestionList;
