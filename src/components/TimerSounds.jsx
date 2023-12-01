/* eslint-disable react/prop-types */
import counterClickSound from "../sounds/counter-click.mp3";
import resetClickSound from "../sounds/reset-click.wav";

const TimerSounds = ({ counterClickAudioRef, resetClickAudioRef }) => {
  return (
    <>
      <audio ref={counterClickAudioRef} src={counterClickSound}></audio>
      <audio ref={resetClickAudioRef} src={resetClickSound}></audio>
    </>
  );
};

export default TimerSounds;
