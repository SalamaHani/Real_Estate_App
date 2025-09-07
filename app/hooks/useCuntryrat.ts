// hooks/useCurrency.ts
import { useState, useEffect } from "react";
const CACHE_KEY = "currency_rates";
const CACHE_TIME = 1000 * 60 * 60;
interface CacheData {
  timestamp: number;
  base: string;
  rates: Record<string, number>;
}

export function useCurrency() {
  const [currency, setCurrencyState] = useState("USD");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load selected currency from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("currency");
    if (stored) setCurrencyState(stored);
  }, []);

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("currency", newCurrency);
  };

  // Fetch exchange rates with cache
  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError(null);

      try {
        // Check cache
        const cachedStr = localStorage.getItem(CACHE_KEY);
        if (cachedStr) {
          const cached: CacheData = JSON.parse(cachedStr);
          const isExpired = Date.now() - cached.timestamp > CACHE_TIME;
          if (!isExpired && cached.base === currency) {
            setRates(cached.rates);
            setLoading(false);
            return;
          }
        }
        // Fetch from API if no cache or expired
        const res = await fetch(
          `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_RqZMBBTcwuGxgBKo27ofqDMkoebJYHuDAHGgGrTg&base_currency=USD`
        );
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const data = await res.json();

        const newRates = data.data || {};
        setRates(newRates);

        // Save to cache
        const cacheData: CacheData = {
          timestamp: Date.now(),
          base: currency,
          rates: newRates,
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CACHE_TIME]);

  // Convert price

  const convertPrice = (amount: number, toCurrency: string = currency) => {
    console.log(currency);
    if (!rates[toCurrency]) return amount;
    return amount * rates[toCurrency];
  };
  return {
    currency,
    setCurrency,
    rates,
    loading,
    error,
    convertPrice,
  };
}
