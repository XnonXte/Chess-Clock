/* eslint-disable react/prop-types */
import { useEffect } from "react";

const MainMenu = ({
  startingData,
  isTimeDifferenceEnabled,
  isMuted,
  setIsMuted,
  setIsInMenu,
  setStartingData,
  setIsTimeDifferenceEnabled,
}) => {
  const { top, bottom, topIncrement, bottomIncrement } = startingData;

  useEffect(() => {
    if (!isTimeDifferenceEnabled) {
      setStartingData((prev) => {
        return {
          ...prev,
          bottom: prev.top,
          bottomIncrement: prev.topIncrement,
        };
      });
    }
  }, [isTimeDifferenceEnabled, setStartingData]);

  function submitData(e) {
    e.preventDefault();
    setIsInMenu(false);
  }

  return (
    <div className="text-white bg-neutral-600">
      <div className="max-w-[480px] bg-neutral-700 flex flex-col justify-between h-screen p-2 mx-auto">
        <div>
          <h2 className="mb-6 text-2xl font-bold text-center">
            Xnon&apos;s Chess Clock
          </h2>
          <form className="flex flex-col gap-2" onSubmit={submitData}>
            <div className="flex items-center justify-between">
              <span>Time difference</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={(e) => setIsTimeDifferenceEnabled(e.target.checked)}
                  checked={isTimeDifferenceEnabled}
                />
                <div className="w-11 h-6 bg-neutral-600 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3264ff]"></div>
              </label>
            </div>

            {isTimeDifferenceEnabled ? (
              <>
                <h3 className="mb-2 text-lg font-semibold">White</h3>
                <hr />
                <div className="flex items-center justify-between">
                  <label htmlFor="time">Minutes</label>
                  <input
                    required
                    type="number"
                    name="time"
                    id="time"
                    className="p-2 text-white border-1 placeholder:italic placeholder:text-neutral-600 bg-neutral-600"
                    placeholder="Enter minute
                            "
                    onChange={(e) =>
                      setStartingData((prev) => {
                        return {
                          ...prev,
                          top: e.target.value,
                        };
                      })
                    }
                    value={top}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="time">Extra seconds</label>
                  <input
                    required
                    type="number"
                    name="time"
                    id="time"
                    className="p-2 text-white border-1 placeholder:italic placeholder:text-neutral-600 bg-neutral-600"
                    placeholder="Enter second
                            "
                    onChange={(e) =>
                      setStartingData((prev) => {
                        return {
                          ...prev,
                          topIncrement: e.target.value,
                        };
                      })
                    }
                    value={topIncrement}
                  />
                </div>
                <h4 className="mb-2 text-lg font-semibold">Black</h4>
                <hr />
                <div className="flex items-center justify-between">
                  <label htmlFor="time">Minutes</label>
                  <input
                    required
                    type="number"
                    name="time"
                    id="time"
                    className="p-2 text-white border-1 placeholder:italic placeholder:text-neutral-600 bg-neutral-600"
                    placeholder="Enter minute
                            "
                    onChange={(e) =>
                      setStartingData((prev) => {
                        return {
                          ...prev,
                          bottom: e.target.value,
                        };
                      })
                    }
                    value={bottom}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="time">Extra seconds</label>
                  <input
                    required
                    type="number"
                    name="time"
                    id="time"
                    className="p-2 text-white border-1 placeholder:italic placeholder:text-neutral-600 bg-neutral-600"
                    placeholder="Enter second
                            "
                    onChange={(e) =>
                      setStartingData((prev) => {
                        return {
                          ...prev,
                          bottomIncrement: e.target.value,
                        };
                      })
                    }
                    value={bottomIncrement}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <label htmlFor="time">Minutes per player</label>
                  <input
                    required
                    type="number"
                    name="time"
                    id="time"
                    className="p-2 text-white border-1 placeholder:italic placeholder:text-neutral-600 bg-neutral-600"
                    placeholder="Enter minute"
                    onChange={(e) =>
                      setStartingData((prev) => {
                        return {
                          ...prev,
                          top: e.target.value,
                          bottom: e.target.value,
                        };
                      })
                    }
                    value={top}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="time">Extra seconds</label>
                  <input
                    required
                    type="number"
                    name="time"
                    id="time"
                    className="p-2 text-white border-1 placeholder:italic placeholder:text-neutral-600 bg-neutral-600"
                    placeholder="Enter second
                      "
                    onChange={(e) =>
                      setStartingData((prev) => {
                        return {
                          ...prev,
                          topIncrement: e.target.value,
                          bottomIncrement: e.target.value,
                        };
                      })
                    }
                    value={topIncrement}
                  />
                </div>
              </>
            )}

            <div className="flex items-center justify-between mt-4">
              <span>Disable sounds</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={(e) => setIsMuted(e.target.checked)}
                  checked={isMuted}
                />
                <div className="w-11 h-6 bg-neutral-600 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3264ff]"></div>
              </label>
            </div>
            <button
              type="submit"
              className="px-4 py-2 mt-6 text-lg bg-[#3264ff] hover:bg-blue-700"
            >
              Start!
            </button>
          </form>
        </div>
        <footer>
          <div className="text-center">
            <a
              href="https://twitter.com/XnonXte"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold hover:text-[#1DA1F2] hover:cursor-pointer"
            >
              &copy; 2023 XnonXte
            </a>
            <p className="text-xs">Chess Clock v0.0.3</p>
            <a
              href="https://github.com/XnonXte/Chess-Clock"
              target="_blank"
              rel="noreferrer"
              className="text-sm hover:text-neutral-400 hover:cursor-pointer"
            >
              <i className="bi bi-github"></i> GitHub
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainMenu;
