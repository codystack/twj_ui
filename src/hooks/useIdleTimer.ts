import { useEffect, useRef } from "react";

const useIdleTimer = (onIdle: () => void, timeout = 10 * 60 * 1000) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current); 
    timerRef.current = setTimeout(onIdle, timeout); 
  };

  useEffect(() => {
    const handleClick = () => {
      resetTimer(); 
    };

    window.addEventListener("click", handleClick);

    resetTimer();

    return () => {
      window.removeEventListener("click", handleClick); 
      if (timerRef.current) clearTimeout(timerRef.current); 
    };
  }, [onIdle, timeout]);

};

export default useIdleTimer;
