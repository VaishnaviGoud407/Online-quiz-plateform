import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestions, saveAnswer } from "../redux/quizSlices";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";

const QUESTION_TIME_LIMIT = 30;
const Practice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, status } = useSelector((state) => state.quiz);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleNext = () => {
    if (selectedOption !== null) {
      dispatch(
        saveAnswer({
          questionIndex: currentIndex,
          selectedOption,
        })
      );
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setTimeUp(false);
    }
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    handleNext();
  };

  if (status === "loading")
    return <h2 className="text-center">Loading Questions...</h2>;
  if (status === "error")
    return (
      <h2 className="text-center text-danger">Failed to Load Questions</h2>
    );

  return (
    <div className="container mt-5">
      {currentIndex < questions.length ? (
        <>
          <h4>{questions[currentIndex].question}</h4>

          <Timer duration={QUESTION_TIME_LIMIT} onTimeUp={handleTimeUp} />

          {questions[currentIndex].options.map((opt, index) => (
            <div key={index} className="form-check">
              <input
                type="radio"
                name="option"
                className="form-check-input"
                onChange={() => setSelectedOption(index)}
              />
              <label className="form-check-label">{opt}</label>
            </div>
          ))}
          <button className="btn btn-primary mt-3" onClick={handleNext}>
            {currentIndex === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </>
      ) : (
        navigate("/results")
      )}
    </div>
  );
};

export default Practice;
