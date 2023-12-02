/*
Copyright (c) 2023 XnonXte 
Chess-Clock version v0.0.2
*/

// TODO: Fix incorrect time decrement.
// TODO: Add end state.
// TODO: Add moves count.
// TODO: Add custom themes?

import { useState } from "react";
import MainMenu from "./components/MainMenu";
import Timer from "./components/Timer";

const App = () => {
  const [startingData, setStartingData] = useState({
    counterTop: "15",
    counterBottom: "15",
    counterTopIncrement: "3",
    counterBottomIncrement: "3",
  });

  const {
    counterTop,
    counterBottom,
    counterTopIncrement,
    counterBottomIncrement,
  } = startingData;

  const [isTimeDifferenceEnabled, setIsTimeDifferenceEnabled] = useState(false);
  const [isInMenu, setIsInMenu] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  return isInMenu ? (
    <MainMenu
      startingData={startingData}
      isMuted={isMuted}
      isTimeDifferenceEnabled={isTimeDifferenceEnabled}
      setIsInMenu={setIsInMenu}
      setIsMuted={setIsMuted}
      setStartingData={setStartingData}
      setIsTimeDifferenceEnabled={setIsTimeDifferenceEnabled}
    />
  ) : (
    <Timer
      counterTop={parseInt(counterTop) * 60}
      counterBottom={parseInt(counterBottom) * 60}
      counterBottomIncrement={parseInt(counterBottomIncrement)}
      counterTopIncrement={parseInt(counterTopIncrement)}
      isMuted={isMuted}
      setIsInMenu={setIsInMenu}
      setIsMuted={setIsMuted}
    />
  );
};

export default App;
