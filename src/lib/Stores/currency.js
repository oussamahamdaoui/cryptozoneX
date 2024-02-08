import { writable, derived } from "svelte/store";

export const SUPORTED_CURRENCIES = {
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
};

export const currency = writable("EUR");
export const digits = derived(currency, ($curr) => {
  return SUPORTED_CURRENCIES[$curr];
});
