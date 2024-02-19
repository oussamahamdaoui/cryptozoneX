import { writable, derived } from "svelte/store";

export const SUPPORTED_CURRENCIES = {
  USD: {
    decimalPlace: 100n,
    symbolPos: "left",
    symbol: "$",
    decimal: ".",
  },
  EUR: {
    decimalPlace: 100n,
    symbolPos: "right",
    symbol: "€",
    decimal: ",",
  },
  INR: {
    decimalPlace: 100n,
    symbolPos: "right",
    symbol: "₹",
    decimal: ",",
  },
};

export const DEFAUL_CURRENCY = "USD";

export const exchange = (exchangeRates) => (amount, of, to) => {
  const amountUSD = amount * exchangeRates[of];
  return amountUSD / exchangeRates[to];
};

export const newCurrencyStore = () => {
  /**
   * @type {import("svelte/store").Writable<keyof typeof SUPPORTED_CURRENCIES>}
   */
  const currency = writable(DEFAUL_CURRENCY);
  const currencyData = derived(currency, ($curr) => {
    return SUPPORTED_CURRENCIES[$curr];
  });

  const exchangeRates = writable({
    USD: 1_000000000n,
    EUR: 1_072097600n,
    INR: 12043063n,
  });

  return {
    currency,
    currencyData,
    exchangeRates,
  };
};
