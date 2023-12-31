import { useState } from "react";
import MainMenu from "./components/MainMenu";
import Timer from "./components/Timer";

const App = () => {
  const [startingData, setStartingData] = useState({
    top: 15,
    bottom: 15,
    topIncrement: 3,
    bottomIncrement: 3,
  });

  const { top, bottom, topIncrement, bottomIncrement } = startingData;
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
      topTime={parseInt(top) * 60}
      bottomTime={parseInt(bottom) * 60}
      bottomIncrement={parseInt(bottomIncrement)}
      topIncrement={parseInt(topIncrement)}
      isMuted={isMuted}
      setIsInMenu={setIsInMenu}
      setIsMuted={setIsMuted}
    />
  );
};

export default App;
