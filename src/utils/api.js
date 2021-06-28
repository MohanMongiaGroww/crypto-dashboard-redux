import axios from "axios";

import { DEFAULT_CURRENCY, CURRENCY_TYPES, API_KEY } from "./constants";
import { ROUTES } from "./apiRoutes";

const axiosInstance = axios.create({
  baseURL: ROUTES.BASE_URL,
  headers: {
    "x-access-token": API_KEY,
    pragma: "no-cache",
    "cache-control": "no-cache",
  },
});

export function getAllCoins(currency) {
  if (currency === null || currency === undefined) {
    currency = DEFAULT_CURRENCY.USD_DOLLAR;
  }
  return axiosInstance.get(ROUTES.ALL_COINS, {
    params: {
      referenceCurrencyUuid: currency,
    },
  });
}

export function getSingleCoin(uuid, currency) {
  if (currency === null || currency === undefined) {
    currency = DEFAULT_CURRENCY.USD_DOLLAR;
  }
  return axiosInstance.get(`${ROUTES.SINGLE_COIN}${uuid}`, {
    params: {
      referenceCurrencyUuid: currency,
    },
  });
}

export function getFiatCurrencies() {
  return axiosInstance.get(`${ROUTES.GET_CURRENCIES}`, {
    params: {
      types: [CURRENCY_TYPES.FIAT],
      limit: 5,
    },
  });
}

export function getCoinMarkets(uuid, currency) {
  if (currency === null || currency === undefined) {
    currency = DEFAULT_CURRENCY.USD_DOLLAR;
  }

  return axiosInstance.get(`${ROUTES.GET_COIN_MARKETS}${uuid}/markets`, {
    params: {
      referenceCurrencyUuid: currency,
    },
  });
}
