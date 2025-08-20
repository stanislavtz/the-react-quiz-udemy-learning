import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Main from "./components/Main";
import WelcomeNote from "./components/WelcomeNote";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";

const URL = "http://localhost:8000/questions";
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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status, index, answer, points, highScore, timeRemaining } =
    state;

  const totalPoints = questions.reduce((acc, el) => acc + el.points, 0);

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

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <WelcomeNote questionsNumber={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={questions.length}
              index={index}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions.at(index)}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} timeRemaining={timeRemaining} />
              <NextButton
                answer={answer}
                dispatch={dispatch}
                index={index}
                numQuestions={questions.length}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
