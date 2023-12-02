import { useState, useEffect } from "react";

export function useCounter(initialSeconds) {
  const [ms, setMs] = useState(initialSeconds * 1000);
  const [isFinished, setIsFinished] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    if (isPaused) {
      // If counter is paused, return early.
      return;
    }

    if (ms === 0) {
      // If counter is equal to 0, return early.
      setIsFinished(true);
      return;
    }

    const timer = setInterval(() => {
      setMs((prevMs) => {
        if (prevMs <= 0) {
          clearInterval(timer);
          setIsFinished(true);

          // Keep the value to 0 if counter has been finished.
          return 0;
        }

        return prevMs - 1;
      });

      setMs((prevMs) => prevMs - 1);
    }, 1);

    // Clean up function so we don't shot ourself in the foot.
    return () => clearInterval(timer);
  }, [ms, isPaused]);

  function startTimer() {
    setIsPaused(false);
  }

  function pauseTimer() {
    setIsPaused(true);
  }

  function resetTimer() {
    setIsFinished(false);
    setMs(initialSeconds * 1000);
  }

  return {
    seconds: ms / 1000,
    isPaused,
    isFinished,
    setMs,
    pauseTimer,
    resetTimer,
    startTimer,
  };
}
