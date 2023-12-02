/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useCounter } from "../hooks/useCountdownTimer";
import { useSounds } from "../hooks/useSounds";
import TimerSounds from "./TimerSounds";
import { formatTime } from "../utils/formatTime";
import { DEFAULT_BG_TEXT, TURN_BG_TEXT, FINISHED_BG_TEXT } from "./_Timer.js";

const Timer = ({
  counterTop,
  counterBottom,
  counterTopIncrement,
  counterBottomIncrement,
  isMuted,
  setIsInMenu,
  setIsMuted,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isCtTurn, setIsCtTurn] = useState(true);

  const ct = useCounter(counterTop); // Counter top (white).
  const cb = useCounter(counterBottom); // Counter bottom (black).

  // Counter themes.
  const ctTheme = ct.isFinished
    ? FINISHED_BG_TEXT
    : ct.isPaused
    ? DEFAULT_BG_TEXT
    : TURN_BG_TEXT;
  const cbTheme = cb.isFinished
    ? FINISHED_BG_TEXT
    : cb.isPaused
    ? DEFAULT_BG_TEXT
    : TURN_BG_TEXT;

  const {
    counterClickAudioRef,
    resetClickAudioRef,
    playCounterClick,
    playResetClick,
  } = useSounds();

  useEffect(() => {
    if (isRunning) {
      // Continue the counter based on who's turn.
      isCtTurn ? ct.startTimer() : cb.startTimer();
    } else {
      ct.pauseTimer();
      cb.pauseTimer();
    }
  }, [ct, cb, isCtTurn, isRunning]);

  useEffect(() => {
    if (ct.isFinished) {
      alert("Black won on time!");
    } else if (cb.isFinished) {
      alert("White won on time!");
    }
  }, [ct.isFinished, cb.isFinished]);

  function alternateTurn() {
    if (!isRunning) {
      // If the timer is still paused.
      return;
    }

    if (isCtTurn) {
      // When it's counter-top's turn.
      ct.setMs((prev) => prev + counterTopIncrement * 1000); // Increment after each move.
      ct.pauseTimer();
      cb.startTimer();
      setIsCtTurn(false);
    } else {
      cb.setMs((prev) => prev + counterBottomIncrement * 1000);
      cb.pauseTimer();
      ct.startTimer();
      setIsCtTurn(true);
    }

    playCounterClick(isMuted);
  }

  function handleTimerPauseUnpause() {
    setIsRunning((prevFlag) => !prevFlag);
  }

  function handleTimerReset() {
    const confirmReset = confirm("Reset the clock?");

    if (!confirmReset) {
      return;
    }

    ct.resetTimer();
    cb.resetTimer();
    setIsRunning(false);

    playResetClick(isMuted);
  }

  function handleMuteToggleClick() {
    setIsMuted((prevFlag) => !prevFlag);
  }

  function handleReturnClick() {
    const confirmReturn = confirm("Go back to menu?");

    if (!confirmReturn) {
      return;
    }

    // Going back to menu.
    setIsInMenu(true);
  }

  return (
    <div className="h-screen bg-neutral-600">
      <div className="flex flex-col justify-between h-screen max-w-[480px] mx-auto">
        <div
          className={`flex-1 text-8xl font-semibold flex items-center justify-center ${ctTheme}`}
          onClick={() => {
            if (!isCtTurn) {
              return;
            }
            alternateTurn();
          }}
        >
          {formatTime(ct.seconds)}
        </div>
        <div className="flex justify-between text-6xl h-1/6 bg-neutral-800 md:text-8xl text-neutral-500">
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
                isRunning ? "bi-pause-fill" : "bi-caret-right-fill"
              }`}
              onClick={handleTimerPauseUnpause}
              title="Pause/Unpause the timer"
            ></button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              className="bi bi-stopwatch"
              onClick={handleReturnClick}
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
          className={`flex-1 text-8xl font-semibold flex items-center justify-center ${cbTheme}`}
          onClick={() => {
            if (isCtTurn) {
              return;
            }
            alternateTurn();
          }}
        >
          {formatTime(cb.seconds)}
        </div>
        <TimerSounds
          counterClickAudioRef={counterClickAudioRef}
          resetClickAudioRef={resetClickAudioRef}
        />
      </div>
    </div>
  );
};

export default Timer;
