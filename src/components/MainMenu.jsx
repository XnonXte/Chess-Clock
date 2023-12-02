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
  const {
    counterTop,
    counterBottom,
    counterTopIncrement,
    counterBottomIncrement,
  } = startingData;

  useEffect(() => {
    if (!isTimeDifferenceEnabled) {
      setStartingData((prev) => {
        return {
          ...prev,
          counterBottom: prev.counterTop,
          counterBottomIncrement: prev.counterTopIncrement,
        };
      });
    }
  }, [isTimeDifferenceEnabled, setStartingData]);

  function submitData(e) {
    e.preventDefault();

    setIsInMenu(false);
  }

  return (
    <div className="text-white bg-neutral-800">
      <div className="container flex flex-col justify-between h-screen p-2 mx-auto">
        <div>
          <h2 className="mb-6 text-3xl font-bold text-center">Chess Clock</h2>
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
                <div className="w-11 h-6 bg-neutral-700 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-700"></div>
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
                    className="p-2 text-white border-1 placeholder:italic placeholder:text-neutral-600 bg-neutral-700"
                    placeholder="Enter minute
                            "
                    onChange={(e) =>
                      setStartingData((prev) => {
                        return {
                          ...prev,
                          counterTop: e.target.value,
                        };
                      })
                    }
                    value={counterTop}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="time">Extra seconds</label>
                  <input
                    required
                    type="number"
                    name="time"
                    id="time"
                    className="p-2 text-white border-1 placeholder:italic placeholder:text-neutral-600 bg-neutral-700"
                    placeholder="Enter second
                            "
                    onChange={(e) =>
                      setStartingData((prev) => {
                        return {
                          ...prev,
                          counterTopIncrement: e.target.value,
                        };
                      })
                    }
                    value={counterTopIncrement}
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
                    className="p-2 text-white border-1 placeholder:italic placeholder:text-neutral-600 bg-neutral-700"
                    placeholder="Enter minute
                            "
                    onChange={(e) =>
                      setStartingData((prev) => {
                        return {
                          ...prev,
                          counterBottom: e.target.value,
                        };
                      })
                    }
                    value={counterBottom}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="time">Extra seconds</label>
                  <input
                    required
                    type="number"
                    name="time"
                    id="time"
                    className="p-2 text-white border-1 placeholder:italic placeholder:text-neutral-600 bg-neutral-700"
                    placeholder="Enter second
                            "
                    onChange={(e) =>
                      setStartingData((prev) => {
                        return {
                          ...prev,
                          counterBottomIncrement: e.target.value,
                        };
                      })
                    }
                    value={counterBottomIncrement}
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
                    className="p-2 text-white border-1 placeholder:italic placeholder:text-neutral-600 bg-neutral-700"
                    placeholder="Enter minute
                      "
                    onChange={(e) =>
                      setStartingData((prev) => {
                        return {
                          ...prev,
                          counterTop: e.target.value,
                          counterBottom: e.target.value,
                        };
                      })
                    }
                    value={counterTop}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="time">Extra seconds</label>
                  <input
                    required
                    type="number"
                    name="time"
                    id="time"
                    className="p-2 text-white border-1 placeholder:italic placeholder:text-neutral-600 bg-neutral-700"
                    placeholder="Enter second
                      "
                    onChange={(e) =>
                      setStartingData((prev) => {
                        return {
                          ...prev,
                          counterTopIncrement: e.target.value,
                          counterBottomIncrement: e.target.value,
                        };
                      })
                    }
                    value={counterTopIncrement}
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
                <div className="w-11 h-6 bg-neutral-700 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-700"></div>
              </label>
            </div>
            <button
              type="submit"
              className="px-4 py-2 mt-6 text-lg bg-blue-700 hover:bg-blue-800"
            >
              Start!
            </button>
          </form>
        </div>
        <footer>
          <div className="text-center">
            <h6 className="text-sm font-semibold">&copy; 2023 XnonXte</h6>
            <span className="text-xs">Chess Clock v0.0.2</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainMenu;
