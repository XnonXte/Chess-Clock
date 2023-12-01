// TODO:
// 1. Add end state to counter (e.g. the background turns red).
// 2. Fix duplicated initial minutes & increment seconds.
// 3. Refactor code?
// 4. Profit?

import { useState } from "react";
import MainMenu from "./components/MainMenu";
import Timer from "./components/Timer";

const App = () => {
  const [counterTopInitialMinutes, setCounterTopInitialMinutes] = useState(15);
  const [counterBottomInitialMinutes, setCounterBottomInitialMinutes] =
    useState(15);
  const [counterTopIncrementSeconds, setCounterTopIncrementSeconds] =
    useState(3);
  const [counterBottomIncrementSeconds, setCounterBottomIncrementSeconds] =
    useState(3);

  const [isInMenu, setIsInMenu] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  return isInMenu ? (
    <MainMenu
      counterBottomIncrementSeconds={counterBottomIncrementSeconds}
      counterBottomInitialMinutes={counterBottomInitialMinutes}
      counterTopIncrementSeconds={counterTopIncrementSeconds}
      counterTopInitialMinutes={counterTopInitialMinutes}
      setCounterBottomIncrementSeconds={setCounterBottomIncrementSeconds}
      setCounterBottomInitialMinutes={setCounterBottomInitialMinutes}
      setCounterTopIncrementSeconds={setCounterTopIncrementSeconds}
      setCounterTopInitialMinutes={setCounterTopInitialMinutes}
      setIsInMenu={setIsInMenu}
      isMuted={isMuted}
      setIsMuted={setIsMuted}
    />
  ) : (
    <Timer
      counterTopInitialSeconds={counterTopInitialMinutes * 60}
      counterBottomInitialSeconds={counterBottomInitialMinutes * 60}
      counterTopIncrementSeconds={counterTopIncrementSeconds}
      counterBottomIncrementSeconds={counterBottomIncrementSeconds}
      isMuted={isMuted}
      setIsInMenu={setIsInMenu}
      setIsMuted={setIsMuted}
    />
  );
};

export default App;
