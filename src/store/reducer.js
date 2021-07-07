import { combineReducers } from "redux";
import {
  FETCH_FIAT_CURRENCIES,
  FETCH_SINGLE_COIN,
  SELECT_REFERENCE_CURRENCY,
  SET_COINS,
} from "./actionTypes";
import { DEFAULT_CURRENCY } from "../utils/constants";

export const setCoinsReducer = (coins = [], action) => {
  switch (action.type) {
    case SET_COINS:
      return action.payload;
    default:
      return coins;
  }
};

export const fetchCurrencyReducer = (currencies = [], action) => {
  switch (action.type) {
    case FETCH_FIAT_CURRENCIES:
      return action.payload;
    default:
      return currencies;
  }
};

export const selectCurrencyReducer = (
  selectedCurrency = DEFAULT_CURRENCY.USD_DOLLAR,
  action
) => {
  switch (action.type) {
    case SELECT_REFERENCE_CURRENCY:
      return action.payload;
    default:
      return selectedCurrency;
  }
};

export const fetchSingleCoinReducer = (coin = {}, action) => {
  switch (action.type) {
    case FETCH_SINGLE_COIN:
      return action.payload;
    default:
      return coin;
  }
};

export default combineReducers({
  currencies: fetchCurrencyReducer,
  selectedCurrency: selectCurrencyReducer,
  coins: setCoinsReducer,
  coin: fetchSingleCoinReducer,
});
