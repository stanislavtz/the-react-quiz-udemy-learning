import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],

  // "loading", "error", "ready", "active", "finish"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  timeRemaining: null,
};

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        timeRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "setAnswer":
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          currentQuestion.correctOption === action.payload
            ? state.points + currentQuestion.points
            : state.points,
      };
    case "getNextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finishQuiz":
      return {
        ...state,
        status: "finish",
        answer: null,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restartQuiz":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
        timeRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "setTimer":
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining === 0 ? "finish" : state.status,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    default:
      throw new Error("Action unknown!");
  }
}

const URL = "http://localhost:8000/questions";

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status, index, answer, points, highScore, timeRemaining } =
    state;

  const totalPoints = questions.reduce((acc, el) => acc + el.points, 0);

  const currentQuestion = questions.at(index);

  useEffect(() => {
    async function getQuestions() {
      try {
        const res = await fetch(URL);
        if (!res.ok) {
          throw new Error("Failed to fetch questions.");
        }

        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        console.error(error);
        dispatch({ type: "dataFailed" });
      }
    }

    getQuestions();
  }, []);

  const quizContextValue = {
    questions,
    status,
    index,
    answer,
    points,
    highScore,
    timeRemaining,
    totalPoints,
    currentQuestion,
    dispatch,
  };

  return (
    <QuizContext.Provider value={quizContextValue}>
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("QuizContext was used out of the ContextProvider.");
  }

  return context;
}

export { QuizProvider, useQuiz };
