import { useState, useEffect } from "react";

export function useCounter(initialSeconds) {
  // Use counter hook.
  // There are many flaws with this implementation but it works.
  // I daren't touch this code anytime soon.
  const [timer, setTimer] = useState(initialSeconds * 1000);
  const [isFinished, setIsFinished] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    let timerInterval;

    if (!isPaused && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prevSeconds) => {
          const newSeconds = prevSeconds - 100;

          if (newSeconds <= 0) {
            clearInterval(timerInterval);
            setIsFinished(true);

            return 0;
          }

          return newSeconds;
        });
      }, 100);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer, isPaused]);

  function startTimer() {
    setIsPaused(false);
  }

  function pauseTimer() {
    setIsPaused(true);
  }

  function resetTimer() {
    setIsFinished(false);
    setTimer(initialSeconds * 1000);
  }

  return {
    timer,
    isPaused,
    isFinished,
    setTimer,
    pauseTimer,
    resetTimer,
    startTimer,
  };
}
