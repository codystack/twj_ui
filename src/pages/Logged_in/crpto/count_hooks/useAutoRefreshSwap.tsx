import { useEffect, useRef, useState } from "react";
import api from "../../../../services/api";

const useAutoRefreshSwap = ({
  quoteId,
  selectedCoin,
  numericAmount,
  setToAmount,
  setCurrency,
  setQuotePrice,
  setError,
}: {
  quoteId: string | null;
  selectedCoin: { value: string } | null;
  numericAmount: number | null;
  setToAmount: (amount: string) => void;
  setCurrency: (currency: string) => void;
  setQuotePrice: (price: string) => void;
  setError: (error: string) => void;
}) => {
  const [countdown, setCountdown] = useState<number>(0);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const refreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const refreshCountRef = useRef<number>(0);
  const countdownPausedRef = useRef<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshSwapQuotation = async () => {
    console.log("Starting refresh");
    console.log("qouteId", quoteId);
    console.log("SelectedCoin", selectedCoin?.value);
    console.log("numericAmount", numericAmount);

    if (!quoteId || !selectedCoin?.value || !numericAmount) return;
    console.log("something went wrong");

    try {
      setIsLoading(true);
      const res = await api.post(
        `/Crypto/refreshSwapQuotation?quotationId=${quoteId}&userId=me`,
        {
          fromCurrency: "ngn",
          toCurrency: selectedCoin.value,
          fromAmount: numericAmount,
        }
      );

      const refreshedData = res?.data?.data;
      setToAmount(refreshedData?.data?.to_amount);
      setCurrency(refreshedData?.data?.to_currency);
      setQuotePrice(refreshedData?.data?.quoted_price);
    } catch (err) {
      setError("Network error, please try again in a few mins");
    } finally {
      setIsLoading(false);
    }
  };

  const stopCountdown = (pause: boolean = true) => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }

    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }

    if (pause) {
      countdownPausedRef.current = true; 
    }

    refreshCountRef.current = 0;
    setCountdown(0);
  };

  const startCountdown = (totalSeconds: number) => {
    if (countdownPausedRef.current) return; 

    stopCountdown(false); 
    setCountdown(totalSeconds);
    refreshCountRef.current = 0;

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          stopCountdown();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    refreshIntervalRef.current = setInterval(() => {
      if (refreshCountRef.current >= 8) {
        stopCountdown();
        return;
      }

      refreshCountRef.current += 1;
      refreshSwapQuotation();
    }, 7000);
  };

  useEffect(() => {
    return () => {
      stopCountdown();
    };
  }, []);

  const resumeCountdown = () => {
    countdownPausedRef.current = false;
  };

  return {
    countdown,
    startCountdown,
    isLoading,
    stopCountdown,
    resumeCountdown,
  };
};

export default useAutoRefreshSwap;
