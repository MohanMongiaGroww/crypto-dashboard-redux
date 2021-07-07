import { getFiatCurrencies, getAllCoins, getSingleCoin } from "../utils/api";
import { doSorting } from "../utils/helpers";

import {
  FETCH_FIAT_CURRENCIES,
  SELECT_REFERENCE_CURRENCY,
  FETCH_SINGLE_COIN,
  SET_COINS,
} from "./actionTypes";


export const setCoins = (coins) => {
  return {
    type: SET_COINS,
    payload : coins
  }
}

export const fetchCoins = () => async (dispatch, getState) => {
  let referenceCurrency = getState().selectedCurrency;
  const coins = await getAllCoins(referenceCurrency.uuid);
  dispatch({
    type: SET_COINS,
    payload: coins.data.data.coins,
  });
};

export const fetchSingleCoin = (uuid) => async (dispatch, getState) => {
  let referenceCurrency = getState().selectedCurrency;
  const coin = await getSingleCoin(uuid,referenceCurrency.uuid);
  dispatch({
      type: FETCH_SINGLE_COIN,
      payload: coin.data.data.coin
  });
};

export const fetchCurrencies = () => async (dispatch) => {
  let currencies = null;
  currencies = await getFiatCurrencies();
  dispatch({
    type: FETCH_FIAT_CURRENCIES,
    payload: currencies.data.data.currencies,
  });
};

export const selectCurrency = (currency,pathname) => async (dispatch, getState) => {
  const oldSelectedCurrency = getState().selectCurrency;
  await dispatch({
    type: SELECT_REFERENCE_CURRENCY,
    payload: currency,
  });
  if (!(oldSelectedCurrency && oldSelectedCurrency.uuid === currency.uuid)) {
    if(pathname === "/")
      dispatch(fetchCoins());
    else if(pathname.startsWith("/coin/"))
      dispatch(fetchSingleCoin(pathname.substr(6)));
    }
}

export const sortCoins = (key) => (dispatch,getState) => {
  let coins = getState().coins;
  doSorting(coins,key);
  dispatch({
    type: SET_COINS,
    payload: coins
  })
}