/* eslint-disable react/prop-types */
import { useState } from "react";

const MainMenu = ({
  counterTopInitialMinutes,
  counterBottomInitialMinutes,
  counterTopIncrementSeconds,
  counterBottomIncrementSeconds,
  isMuted,
  setCounterBottomInitialMinutes,
  setCounterTopInitialMinutes,
  setCounterTopIncrementSeconds,
  setCounterBottomIncrementSeconds,
  setIsInMenu,
  setIsMuted,
}) => {
  const [isTimeDifferenceEnabled, setIsTimeDifferenceEnabled] = useState(false);

  return (
    <div className="text-white bg-neutral-800">
      <div className="h-screen container p-2 mx-auto flex flex-col justify-between">
        <div>
          <h2 className="mb-6 text-2xl font-bold text-center">Chess Clock</h2>
          <form className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span>Time difference between players</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={(e) => setIsTimeDifferenceEnabled(e.target.checked)}
                  checked={isTimeDifferenceEnabled}
                />
                <div className="w-11 h-6 bg-neutral-700 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-700"></div>
              </label>
            </div>

            {isTimeDifferenceEnabled ? (
              <>
                <h4 className="mb-2 text-lg font-semibold">Player 1</h4>
                <div className="flex items-center justify-between">
                  <label htmlFor="time">Minutes</label>
                  <input
                    type="number"
                    name="time"
                    id="time"
                    className="p-2 border-1 text-white placeholder:italic placeholder:text-neutral-600 bg-neutral-700"
                    placeholder="Enter minute
                            "
                    onChange={(e) =>
                      setCounterTopInitialMinutes(parseInt(e.target.value))
                    }
                    value={counterTopInitialMinutes}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="time">Extra seconds</label>
                  <input
                    type="number"
                    name="time"
                    id="time"
                    className="p-2 border-1 text-white placeholder:italic placeholder:text-neutral-600 bg-neutral-700"
                    placeholder="Enter second
                            "
                    onChange={(e) =>
                      setCounterTopIncrementSeconds(parseInt(e.target.value))
                    }
                    value={counterTopIncrementSeconds}
                  />
                </div>
                <h4 className="mb-2 text-lg font-semibold">Player 2</h4>
                <div className="flex items-center justify-between">
                  <label htmlFor="time">Minutes</label>
                  <input
                    type="number"
                    name="time"
                    id="time"
                    className="p-2 border-1 text-white placeholder:italic placeholder:text-neutral-600 bg-neutral-700"
                    placeholder="Enter minute
                            "
                    onChange={(e) =>
                      setCounterBottomInitialMinutes(parseInt(e.target.value))
                    }
                    value={counterBottomInitialMinutes}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="time">Extra seconds</label>
                  <input
                    type="number"
                    name="time"
                    id="time"
                    className="p-2 border-1 text-white placeholder:italic placeholder:text-neutral-600 bg-neutral-700"
                    placeholder="Enter second
                            "
                    onChange={(e) =>
                      setCounterBottomIncrementSeconds(parseInt(e.target.value))
                    }
                    value={counterBottomIncrementSeconds}
                  />
                </div>
              </>
            ) : (
              // Time per player.
              <>
                <div className="flex items-center justify-between">
                  <label htmlFor="time">Minutes per player</label>
                  <input
                    type="number"
                    name="time"
                    id="time"
                    className="p-2 border-1 text-white placeholder:italic placeholder:text-neutral-600 bg-neutral-700"
                    placeholder="Enter minute
                      "
                    onChange={(e) => {
                      setCounterTopInitialMinutes(parseInt(e.target.value));
                      setCounterBottomInitialMinutes(parseInt(e.target.value));
                    }}
                    value={counterTopInitialMinutes}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="time">Extra seconds</label>
                  <input
                    type="number"
                    name="time"
                    id="time"
                    className="p-2 border-1 text-white placeholder:italic placeholder:text-neutral-600 bg-neutral-700"
                    placeholder="Enter second
                      "
                    onChange={(e) => {
                      setCounterTopIncrementSeconds(parseInt(e.target.value));
                      setCounterBottomIncrementSeconds(
                        parseInt(e.target.value)
                      );
                    }}
                    value={counterTopIncrementSeconds}
                  />
                </div>
              </>
            )}

            <div className="flex items-center justify-between">
              <span>Enable sounds</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={(e) => {
                    setIsMuted(e.target.checked);
                  }}
                  checked={isMuted}
                />
                <div className="w-11 h-6 bg-neutral-700 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-700"></div>
              </label>
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-lg bg-blue-700 hover:bg-blue-800 mt-6"
              onClick={() => setIsInMenu(false)}
            >
              Start!
            </button>
          </form>
        </div>
        <footer>
          <div className="text-center">
            <h6 className="text-sm font-semibold">&copy; 2023 XnonXte</h6>
            <span className="text-xs">Chess Clock v0.0.1</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainMenu;
