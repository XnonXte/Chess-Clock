/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { useCounter } from "../hooks/useCounter";
import { useSounds } from "../hooks/useSounds";
import TimerSounds from "./TimerSounds";
import { parseTime } from "../utils/parseTime";
import { DEFAULT_BG_TEXT, TURN_BG_TEXT, FINISHED_BG_TEXT } from "./_Timer";

const Timer = ({
  topTime,
  bottomTime,
  topIncrement,
  bottomIncrement,
  isMuted,
  setIsInMenu,
  setIsMuted,
}) => {
  // Please close this file if you have fear of some insane level of spaghetti code.
  // It's not the optimized for clarity, but overall the code works.

  const hasEffectRunOnce = useRef(null);

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTopTurn, setIsTopTurn] = useState(true);

  const top = useCounter(topTime); // Counter top (white).
  const bottom = useCounter(bottomTime); // Counter bottom (black).

  // Counter themes.
  const topTheme = top.isFinished
    ? FINISHED_BG_TEXT
    : top.isPaused
    ? DEFAULT_BG_TEXT
    : TURN_BG_TEXT;
  const bottomTheme = bottom.isFinished
    ? FINISHED_BG_TEXT
    : bottom.isPaused
    ? DEFAULT_BG_TEXT
    : TURN_BG_TEXT;

  const {
    counterClickAudioRef,
    resetClickAudioRef,
    finishedAudioRef,
    playCounterClick,
    playResetClick,
    playFinished,
  } = useSounds();

  useEffect(() => {
    // useEffect hook on alternating turns.

    // Which counter should takes turn.
    if (isTimerRunning) {
      isTopTurn ? top.startTimer() : bottom.startTimer();
    } else {
      top.pauseTimer();
      bottom.pauseTimer();
    }
  }, [top, bottom, isTopTurn, isTimerRunning]);

  useEffect(() => {
    // useEffect hook on timer finished.
    if (top.isFinished || (bottom.isFinished && !hasEffectRunOnce.current)) {
      // Finished message.
      playFinished();

      // Clean up operations.
      top.pauseTimer();
      bottom.pauseTimer();
      setIsTimerRunning(false);
      setIsTopTurn(true);

      // Mark this effect hook as run.
      hasEffectRunOnce.current = true;

      if (top.isFinished) {
        alert("Black won on time!");
      } else if (bottom.isFinished) {
        alert("Black won on time!");
      }
    }
  }, [top.isFinished, bottom.isFinished, top, bottom, playFinished]);

  function alternateTurn() {
    if (!isTimerRunning) {
      // If the timer is still paused.
      return;
    }

    if (isTopTurn) {
      top.setTimer((prev) => prev + topIncrement * 1000); // Increment after each move.
      top.pauseTimer();
      bottom.startTimer();
      setIsTopTurn(false);
    } else {
      bottom.setTimer((prev) => prev + bottomIncrement * 1000);
      bottom.pauseTimer();
      top.startTimer();
      setIsTopTurn(true);
    }

    playCounterClick(isMuted);
  }

  function handleTimerPauseUnpause() {
    if (top.timer > 0 && bottom.timer > 0) {
      setIsTimerRunning((prevFlag) => !prevFlag);
    }
  }

  function handleTimerReset() {
    const confirmReset = confirm("Reset the clock?");

    if (confirmReset === false) {
      return;
    }

    top.resetTimer();
    bottom.resetTimer();
    setIsTimerRunning(false);
    playResetClick(isMuted);

    // Set the finished effect flag to true to set for another finished state.
    hasEffectRunOnce.current = false;
  }

  function handleMuteToggleClick() {
    setIsMuted((prevFlag) => !prevFlag);
  }

  function handleReturnClick() {
    const confirmReturn = confirm("Go back to menu?");

    if (confirmReturn === false) {
      return;
    }

    setIsInMenu(true);
  }

  return (
    <div className="h-screen bg-neutral-600">
      <div className="flex flex-col justify-between h-screen max-w-[480px] mx-auto">
        <div
          className={`flex-1 text-8xl font-semibold flex items-center justify-center ${topTheme} rotate-180`}
          onClick={() => {
            if (!isTopTurn) {
              return;
            }
            alternateTurn();
          }}
        >
          {parseTime(top.timer)}
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
                isTimerRunning ? "bi-pause-fill" : "bi-caret-right-fill"
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
          className={`flex-1 text-8xl font-semibold flex items-center justify-center ${bottomTheme}`}
          onClick={() => {
            if (isTopTurn) {
              return;
            }
            alternateTurn();
          }}
        >
          {parseTime(bottom.timer)}
        </div>
        <TimerSounds
          counterClickAudioRef={counterClickAudioRef}
          resetClickAudioRef={resetClickAudioRef}
          finishedAudioRef={finishedAudioRef}
        />
      </div>
    </div>
  );
};

export default Timer;
