import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

function Timer() {
  const { setTimer, timeRemaining } = useQuiz();

  const mins = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer();
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [setTimer]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins} : {seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
