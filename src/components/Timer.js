import { useEffect } from "react";

function Timer({ dispatch, timeRemaining }) {
    const mins = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch({ type: "setTimer" });
    }, 1000);

    return () => {
        clearInterval(timerId);
    }
  }, [dispatch]);

  return <div className="timer">{mins < 10 && "0"}{mins} : {seconds < 10 && "0"}{seconds}</div>;
}

export default Timer;
