import { getFiatCurrencies, getAllCoins, getSingleCoin } from "../utils/api";
import { DEFAULT_CURRENCY } from "../utils/constants";

import {
  FETCH_FIAT_CURRENCIES,
  SELECT_REFERENCE_CURRENCY,
  FETCH_CRYPTO_COINS,
  FETCH_SINGLE_COIN,
} from "./actionTypes";

export const fetchCoins = () => async (dispatch, getState) => {
  let referenceCurrency = getState().selectCurrency;
  if (!referenceCurrency) {
    referenceCurrency = DEFAULT_CURRENCY.USD_DOLLAR;
  }
  const coins = await getAllCoins(referenceCurrency.uuid);
  dispatch({
    type: FETCH_CRYPTO_COINS,
    payload: coins.data.data.coins,
  });
};

export const fetchSingleCoin = (uuid) => async (dispatch, getState) => {
  let referenceCurrency = getState().selectCurrency;
  if (!referenceCurrency) {
    referenceCurrency = DEFAULT_CURRENCY.USD_DOLLAR;
  }
  const coin = await getSingleCoin(uuid,referenceCurrency.uuid);
  dispatch({
      type: FETCH_SINGLE_COIN,
      payload: coin.data.data.coin
  });
};

// export const selectCoin = (coin) => {
//     return {
//         type : SELECT_COIN,
//         payload : coin
//     }
// }

export const fetchCurrencies = () => async (dispatch) => {
  let currencies = null;
  currencies = await getFiatCurrencies();
  dispatch({
    type: FETCH_FIAT_CURRENCIES,
    payload: currencies.data.data.currencies,
  });
};

export const selectCurrency = (currency) => async (dispatch, getState) => {
  const oldSelectedCurrency = getState().selectCurrency;
  if (!(oldSelectedCurrency && oldSelectedCurrency.uuid === currency.uuid)) {
    // dispatch new prices
    dispatch({
      type: SELECT_REFERENCE_CURRENCY,
      payload: currency,
    });
  }
};
