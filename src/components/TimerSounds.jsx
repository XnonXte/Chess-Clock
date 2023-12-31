/* eslint-disable react/prop-types */
import counterClickSound from "../sounds/counter-click.mp3";
import resetClickSound from "../sounds/reset-click.wav";
import finishedSound from "../sounds/finished.wav";

const TimerSounds = ({
  counterClickAudioRef,
  resetClickAudioRef,
  finishedAudioRef,
}) => {
  return (
    <>
      <audio ref={counterClickAudioRef} src={counterClickSound}></audio>
      <audio ref={resetClickAudioRef} src={resetClickSound}></audio>
      <audio ref={finishedAudioRef} src={finishedSound}></audio>
    </>
  );
};

export default TimerSounds;
