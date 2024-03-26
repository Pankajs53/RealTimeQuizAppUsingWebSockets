import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: localStorage.getItem("questions")
    ? JSON.parse(localStorage.getItem("questions"))
    : [],
};

const questionSlice = createSlice({
  name: "question",
  initialState: initialState,
  reducers: {
    addQuestion(state, action) {
      state.questions.push(action.payload);
      localStorage.setItem("question", JSON.stringify(state.questions));
    },
    updateQuestion(state, action) {
      const { id, updatedQuestion } = action.payload;
      const index = state.questions.findIndex(
        (question) => question.id === id
      );
      if (index !== -1) {
        state.questions[index] = updatedQuestion;
        localStorage.setItem("question", JSON.stringify(state.questions));
      }
    },
    deleteQuestion(state, action) {

      const index = action.payload;
      console.log("received index is->",index);
      state.questions = state.questions.filter(
        (question) => question.index !== index
      );
      localStorage.setItem("question", JSON.stringify(state.questions));
    },
    clearQuestions(state) {
      state.questions = [];
      localStorage.removeItem("question");
    },
  },
});

export const {
  addQuestion,
  updateQuestion,
  deleteQuestion,
  clearQuestions,
} = questionSlice.actions;

export default questionSlice.reducer;
