import { useEffect, useRef, useState } from "react";
import api from "../../../../services/api";

const useAutoRefreshSellSwap = ({
  quoteId,
  userId, // 👈 new dynamic input
  selectedCoin,
  numericAmount,
  setToAmount,
  setCurrency,
//   setQuotePrice,
  setError,
}: {
  quoteId: string | null;
  userId: string | undefined;
  selectedCoin: { value: string } | null;
  numericAmount: number | null;
  setToAmount: (amount: string) => void;
  setCurrency: (currency: string) => void;
//   setQuotePrice?: (price: string) => void;
  setError: (error: string) => void;
}) => {
  const [countdown, setCountdown] = useState<number>(0);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshSellSwapQuotation = async () => {
    // if (!quoteId || !selectedCoin?.value || !numericAmount || !userId) return;

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
    //   setQuotePrice(refreshedData?.data?.quoted_price);
      startCountdown(13);
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
    setCountdown(0);
  };

  const startCountdown = (seconds: number) => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }

    setCountdown(seconds);

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current!);
          refreshSellSwapQuotation(); // 👈 call correct refresh
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
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
