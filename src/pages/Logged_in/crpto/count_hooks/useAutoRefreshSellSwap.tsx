import { useEffect, useRef, useState } from "react";
import api from "../../../../services/api";

const useAutoRefreshSellSwap = ({
  quoteId,
  userId,
  selectedCoin,
  numericAmount,
  setToAmount,
  setCurrency,
  setError,
}: {
  quoteId: string | null;
  userId: string | undefined;
  selectedCoin: { value: string } | null;
  numericAmount: number | null;
  setToAmount: (amount: string) => void;
  setCurrency: (currency: string) => void;
  setError: (error: string) => void;
}) => {
  const [countdown, setCountdown] = useState<number>(0);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const refreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const refreshCountRef = useRef<number>(0);
  const countdownPausedRef = useRef<boolean>(false); // ✅ new ref
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshSellSwapQuotation = async () => {
    if (!quoteId || !selectedCoin?.value || !numericAmount || !userId) return;
    if (countdownPausedRef.current) return; // ✅ prevent refresh if paused

    try {
      setIsLoading(true);
      const res = await api.post(
        `/Crypto/refreshSwapQuotation?quotationId=${quoteId}&userId=${userId}`,
        {
          fromCurrency: selectedCoin.value,
          toCurrency: "ngn",
          fromAmount: numericAmount,
        }
      );

      const refreshedData = res?.data?.data;
      setToAmount(refreshedData?.data?.to_amount);
      setCurrency(refreshedData?.data?.to_currency);
    } catch (err) {
      console.error("Failed to refresh sell quotation:", err);
      setError("Failed to refresh sell quotation.");
    } finally {
      setIsLoading(false);
    }
  };

  const stopCountdown = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }

    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }

    refreshCountRef.current = 0;
    countdownPausedRef.current = false; // ✅ reset pause state
    setCountdown(0);
  };

  const pauseCountdown = () => {
    countdownPausedRef.current = true;
  };

  const resumeCountdown = () => {
    countdownPausedRef.current = false;
  };

  const startCountdown = (seconds: number) => {
    stopCountdown();
    setCountdown(seconds);
    refreshCountRef.current = 0;
    countdownPausedRef.current = false;

    // Countdown display logic
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          stopCountdown();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Refresh logic (every 7s, up to 8 times)
    refreshIntervalRef.current = setInterval(() => {
      if (countdownPausedRef.current) return;
      if (refreshCountRef.current >= 8) {
        stopCountdown();
        return;
      }

      refreshCountRef.current += 1;
      refreshSellSwapQuotation();
    }, 7000);
  };

  useEffect(() => {
    return () => {
      stopCountdown();
    };
  }, []);

  return {
    countdown,
    startCountdown,
    stopCountdown,
    pauseCountdown,
    resumeCountdown,
    isLoading,
  };
};

export default useAutoRefreshSellSwap;
