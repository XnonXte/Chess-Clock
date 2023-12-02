// Playing audio on click.

import { useRef } from "react";

export function useSounds() {
  const counterClickAudioRef = useRef(null);
  const resetClickAudioRef = useRef(null);

  function playCounterClick(isMuted) {
    isMuted || counterClickAudioRef.current.play();
  }

  function playResetClick(isMuted) {
    isMuted || resetClickAudioRef.current.play();
  }

  return {
    counterClickAudioRef,
    resetClickAudioRef,
    playCounterClick,
    playResetClick,
  };
}
