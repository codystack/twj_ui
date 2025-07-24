import { useEffect, useRef, useState } from "react";
import api from "../../../../services/api";
// your axios instance

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshSwapQuotation = async () => {
    if (!quoteId || !selectedCoin?.value || !numericAmount) return;

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
      startCountdown(13);
    } catch (err) {
      console.error("Failed to refresh quotation:", err);
      setError("Failed to refresh quotation.");
    } finally {
      setIsLoading(false);
    }
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
          refreshSwapQuotation();
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
    isLoading,
  };
};

export default useAutoRefreshSwap;
