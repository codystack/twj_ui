import { useEffect, useRef, useState } from "react";
import api from "../../../../services/api";

// const useAutoRefreshSwap = ({
//   quoteId,
//   selectedCoin,
//   numericAmount,
//   setToAmount,
//   setCurrency,
//   setQuotePrice,
//   setError,
// }: {
//   quoteId: string | null;
//   selectedCoin: { value: string } | null;
//   numericAmount: number | null;
//   setToAmount: (amount: string) => void;
//   setCurrency: (currency: string) => void;
//   setQuotePrice: (price: string) => void;
//   setError: (error: string) => void;
// }) => {
//   const [countdown, setCountdown] = useState<number>(0);
//   const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   const refreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
//     null
//   );
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const refreshSwapQuotation = async () => {
//     if (!quoteId || !selectedCoin?.value || !numericAmount) return;

//     try {
//       setIsLoading(true);
//       const res = await api.post(
//         `/Crypto/refreshSwapQuotation?quotationId=${quoteId}&userId=me`,
//         {
//           fromCurrency: "ngn",
//           toCurrency: selectedCoin.value,
//           fromAmount: numericAmount,
//         }
//       );

//       const refreshedData = res?.data?.data;
//       setToAmount(refreshedData?.data?.to_amount);
//       setCurrency(refreshedData?.data?.to_currency);
//       setQuotePrice(refreshedData?.data?.quoted_price);
//     } catch (err) {
//       // console.error("Failed to refresh quotation:", err);
//       setError("network error, please try again in a few mins");
//       return err
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const stopCountdown = () => {
//     if (countdownRef.current) {
//       clearInterval(countdownRef.current);
//       countdownRef.current = null;
//     }

//     if (refreshIntervalRef.current) {
//       clearInterval(refreshIntervalRef.current);
//       refreshIntervalRef.current = null;
//     }

//     setCountdown(0);
//   };

//   const startCountdown = (totalSeconds: number) => {
//     stopCountdown(); // clear existing intervals

//     setCountdown(totalSeconds);

//     // countdown timer
//     countdownRef.current = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev <= 1) {
//           stopCountdown();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     // refresh quotation every 7 seconds
//     refreshIntervalRef.current = setInterval(() => {
//       refreshSwapQuotation();
//     }, 7000);
//   };

//   useEffect(() => {
//     return () => {
//       stopCountdown();
//     };
//   }, []);

//   return {
//     countdown,
//     startCountdown,
//     isLoading,
//     stopCountdown,
//   };
// };

// export default useAutoRefreshSwap;
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
  const countdownPausedRef = useRef<boolean>(false); // ✅

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
      countdownPausedRef.current = true; // ✅ prevent accidental restart
    }

    refreshCountRef.current = 0;
    setCountdown(0);
  };

  const startCountdown = (totalSeconds: number) => {
    if (countdownPausedRef.current) return; // ❌ paused? do nothing

    stopCountdown(false); // ✅ stop without pausing
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
