import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const SiteFxContext = createContext(null);

export function SiteFxProvider({ children }) {
  const [matrixRain, setMatrixRain] = useState(false);
  const [chaosMode, setChaosMode] = useState(false);
  const [fxToast, setFxToast] = useState(null);
  const timersRef = useRef([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const toggleMatrixRain = useCallback(() => {
    setMatrixRain((v) => !v);
  }, []);

  const activateChaos = useCallback(() => {
    clearTimers();
    setChaosMode(true);
    setMatrixRain(true);
    setFxToast("KONAMI — chaos matrix engaged");
    timersRef.current.push(
      window.setTimeout(() => setFxToast(null), 3200),
      window.setTimeout(() => setChaosMode(false), 9000),
    );
  }, [clearTimers]);

  const value = useMemo(
    () => ({
      matrixRain,
      setMatrixRain,
      toggleMatrixRain,
      chaosMode,
      activateChaos,
      fxToast,
      setFxToast,
    }),
    [matrixRain, toggleMatrixRain, chaosMode, activateChaos, fxToast],
  );

  return <SiteFxContext.Provider value={value}>{children}</SiteFxContext.Provider>;
}

export function useSiteFx() {
  const ctx = useContext(SiteFxContext);
  if (!ctx) throw new Error("useSiteFx must be used within SiteFxProvider");
  return ctx;
}
