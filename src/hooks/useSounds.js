import { useRef } from "react";

export function useSounds() {
  // Play audio on click.
  const counterClickAudioRef = useRef(null);
  const resetClickAudioRef = useRef(null);
  const finishedAudioRef = useRef(null);

  function playCounterClick(isMuted) {
    isMuted || counterClickAudioRef.current.play();
  }

  function playResetClick(isMuted) {
    isMuted || resetClickAudioRef.current.play();
  }

  function playFinished(isMuted) {
    isMuted || finishedAudioRef.current.play();
  }

  return {
    counterClickAudioRef,
    resetClickAudioRef,
    finishedAudioRef,
    playCounterClick,
    playResetClick,
    playFinished,
  };
}
