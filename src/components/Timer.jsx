/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { useCounter } from "../hooks/useCountdownTimer";
import TimerSounds from "./TimerSounds";
import { formatTime } from "../utils/formatTime";

const Timer = ({
  counterTopInitialSeconds,
  counterBottomInitialSeconds,
  counterTopIncrementSeconds,
  counterBottomIncrementSeconds,
  setIsInMenu,
  setIsMuted,
  isMuted,
}) => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isCounterTopTurn, setIsCounterTopTurn] = useState(true);

  const counterTop = useCounter(counterTopInitialSeconds);
  const counterBottom = useCounter(counterBottomInitialSeconds);

  useEffect(() => {
    if (isTimerRunning) {
      // Continue the counter based on who's turn.
      isCounterTopTurn ? counterTop.startTimer() : counterBottom.startTimer();
    } else {
      counterTop.pauseTimer();
      counterBottom.pauseTimer();
    }
  }, [counterBottom, counterTop, isCounterTopTurn, isTimerRunning]);

  function alternateTurn() {
    if (!isTimerRunning) {
      // If the timer is still paused.
      return;
    }

    if (isCounterTopTurn) {
      // When it's counter-top's turn.
      counterTop.setMs((prev) => prev + counterTopIncrementSeconds * 1000); // Increment after each move.
      counterTop.pauseTimer();
      counterBottom.startTimer();
      setIsCounterTopTurn(false);
    } else {
      counterBottom.setMs(
        (prev) => prev + counterBottomIncrementSeconds * 1000
      );
      counterBottom.pauseTimer();
      counterTop.startTimer();
      setIsCounterTopTurn(true);
    }

    playCounterClick();
  }

  function handleTimerPauseUnpause() {
    setIsTimerRunning((prevFlag) => !prevFlag);
  }

  function handleTimerReset() {
    counterTop.resetTimer();
    counterBottom.resetTimer();
    setIsTimerRunning(false);

    playResetClick();
  }

  function handleMuteToggleClick() {
    setIsMuted((prevFlag) => !prevFlag);
  }

  function handleGoBackClick() {
    // Going back to menu.
    setIsInMenu(true);
  }

  // Playing audio on click.

  const counterClickAudioRef = useRef(null);
  const resetClickAudioRef = useRef(null);

  function playCounterClick() {
    if (isMuted) {
      return;
    }

    counterClickAudioRef.current.play();
  }

  function playResetClick() {
    if (isMuted) {
      return;
    }
    resetClickAudioRef.current.play();
  }

  return (
    <>
      <div
        className={`h-[45vh] text-8xl md:text-8xl flex justify-center items-center font-semibold rotate-180 ${
          counterTop.isPaused
            ? "bg-neutral-700 text-neutral-950"
            : "bg-blue-700 text-white"
        }`}
        onClick={() => {
          if (!isCounterTopTurn) {
            return;
          }

          alternateTurn();
        }}
      >
        {formatTime(counterTop.seconds)}
      </div>
      <div className="h-[10vh] bg-neutral-800 text-6xl md:text-8xl flex justify-between text-neutral-400">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            className="bi bi-arrow-clockwise"
            onClick={handleTimerReset}
            title="Reset the timer"
          ></button>
          <button
            type="button"
            className={`bi ${
              isTimerRunning ? "bi-pause-fill" : "bi-caret-right-fill"
            }`}
            onClick={handleTimerPauseUnpause}
            title="Pause/Unpause the timer"
          ></button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            className="bi bi-clock"
            onClick={handleGoBackClick}
            title="Go back to menu"
          ></button>
          <button
            type="button"
            className={`bi ${
              isMuted ? "bi-volume-mute-fill" : "bi-volume-up-fill"
            }`}
            onClick={handleMuteToggleClick}
            title="Disable sounds"
          ></button>
        </div>
      </div>
      <div
        className={`h-[45vh] text-8xl md:text-8xl flex justify-center items-center font-semibold ${
          counterBottom.isPaused
            ? "bg-neutral-700 text-neutral-950"
            : "bg-blue-700 text-white"
        }`}
        onClick={() => {
          if (isCounterTopTurn) {
            return;
          }

          alternateTurn();
        }}
      >
        {formatTime(counterBottom.seconds)}
      </div>

      <TimerSounds
        counterClickAudioRef={counterClickAudioRef}
        resetClickAudioRef={resetClickAudioRef}
      />
    </>
  );
};

export default Timer;
