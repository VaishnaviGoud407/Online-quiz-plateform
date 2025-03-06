import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchQuestions = createAsyncThunk(
  "quiz/fetchQuestions",
  async () => {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=5&category=18&type=multiple"
    );
    const data = await response.json();
    return data.results.map((q) => ({
      question: q.question,
      options: [...q.incorrect_answers, q.correct_answer].sort(
        () => Math.random() - 0.5
      ),
      correctOption: q.correct_answer,
    }));
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    questions: [],
    userAnswers: [],
    score: 0,
    status: "idle",
  },
  reducers: {
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    saveAnswer: (state, action) => {
      const { questionIndex, selectedOption } = action.payload;
      const question = state.questions[questionIndex];

      if (!question) return;
      const isCorrect = question.correctAnswer === selectedOption;

      state.answers[questionIndex] = {
        selectedOption,
        isCorrect,
      };
    },
    calculateScore: (state) => {
      state.score = state.userAnswers.filter((ans) => ans.isCorrect).length;
    },
    resetQuiz: (state) => {
      state.userAnswers = [];
      state.score = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "success";
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { saveAnswer, calculateScore, resetQuiz, addQuestion } =
  quizSlice.actions;
export default quizSlice.reducer;
