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
  const refreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshSellSwapQuotation = async () => {
    if (!quoteId || !selectedCoin?.value || !numericAmount || !userId) return;

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

    setCountdown(0);
  };

  //   const startCountdown = (seconds: number) => {
  //     stopCountdown(); // Clear any existing intervals

  //     setCountdown(seconds);

  //     // Countdown timer (decrements every second)
  //     countdownRef.current = setInterval(() => {
  //       setCountdown((prev) => {
  //         if (prev <= 1) {
  //           stopCountdown(); // Stop both countdown and refresh
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);

  //     // Auto-refresh every 7 seconds
  //     refreshIntervalRef.current = setInterval(() => {
  //       refreshSellSwapQuotation();
  //     }, 7000);
  //   };

  const startCountdown = (seconds: number) => {
    stopCountdown();

    setCountdown(seconds);

    // Countdown
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
    isLoading,
  };
};

export default useAutoRefreshSellSwap;
