import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "../redux/quizSlices";

const MAX_QUESTIONS = 5; 

const QuizCreation = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.quiz.questions);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddQuestion = () => {
    if (questions.length >= MAX_QUESTIONS) {
      setErrorMessage(`You can only add up to ${MAX_QUESTIONS} questions.`);
      return;
    }

    if (!questionText || correctAnswer === null || options.some((opt) => opt.trim() === "")) {
      setErrorMessage("Please fill all fields before adding a question.");
      return;
    }

    dispatch(
      addQuestion({
        question: questionText,
        options,
        correctAnswer,
      })
    );

    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer(null);
    setErrorMessage("");
  };

  return (
    <div className="container mt-4">
      <h2>Create Quiz</h2>

      {questions.length >= MAX_QUESTIONS && (
        <div className="alert alert-warning">Maximum question limit reached.</div>
      )}

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="mb-3">
        <label className="form-label">Question</label>
        <input
          type="text"
          className="form-control"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          disabled={questions.length >= MAX_QUESTIONS} 
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Options</label>
        {options.map((opt, index) => (
          <div key={index} className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              value={opt}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              disabled={questions.length >= MAX_QUESTIONS} 
            />
          </div>
        ))}
      </div>

      <div className="mb-3">
        <label className="form-label">Correct Answer</label>
        <select
          className="form-select"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(Number(e.target.value))}
          disabled={questions.length >= MAX_QUESTIONS} 
        >
          <option value={null}>Select Correct Answer</option>
          {options.map((opt, index) => (
            <option key={index} value={index}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <button
        className="btn btn-primary"
        onClick={handleAddQuestion}
        disabled={questions.length >= MAX_QUESTIONS} 
      >
        Add Question
      </button>

      <div className="mt-4">
        <h4>Questions List</h4>
        <ul className="list-group">
          {questions.map((q, index) => (
            <li key={index} className="list-group-item">
              {index + 1}. {q.question}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuizCreation;
