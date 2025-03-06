import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetQuiz } from "../redux/quizSlices";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const { userAnswers, score, questions } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRestart = () => {
    dispatch(resetQuiz());
    navigate("/practice");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Quiz Results</h2>
      <h4 className="text-center">
        Your Score: {score} / {questions.length}
      </h4>

      <div className="mt-4">
        {userAnswers.map((ans, index) => {
          const isCorrect = ans.isCorrect;
          return (
            <div
              key={index}
              className={`p-3 my-2 border rounded ${
                isCorrect ? "bg-success text-white" : "bg-danger text-white"
              }`}
            >
              <h5>
                Q{index + 1}: {ans.question}
              </h5>
              <p>
                <strong>Your Answer:</strong>{" "}
                {questions[index].options[ans.selectedOption]}
              </p>
              {!isCorrect && (
                <p>
                  <strong>Correct Answer:</strong>{" "}
                  {questions[index].options[questions[index].correctOption]}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handleRestart}>
          Restart Quiz
        </button>
        <button
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Results;
