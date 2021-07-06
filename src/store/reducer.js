import { combineReducers } from "redux";
import { FETCH_CRYPTO_COINS, FETCH_FIAT_CURRENCIES, FETCH_SINGLE_COIN, SELECT_REFERENCE_CURRENCY } from "./actionTypes";
import { DEFAULT_CURRENCY } from "../utils/constants";

export const fetchCurrencyReducer = (currencies = [],action) => {
    switch(action.type) {
        case FETCH_FIAT_CURRENCIES:
            return action.payload;
        default:
            return currencies;
    }
}

export const selectCurrencyReducer = (selectedCurrency = DEFAULT_CURRENCY.USD_DOLLAR,action) => {
    switch(action.type) {
        case SELECT_REFERENCE_CURRENCY:
            return action.payload;
        default:
            return selectedCurrency;
    }
}

export const fetchCoinsReducer = (coins = [],action) => {
    switch (action.type) {
        case FETCH_CRYPTO_COINS:
            return action.payload
        default:
            return coins;
    }
}

export const fetchSingleCoinReducer = (coin = {},action) => {
    switch(action.type) {
        case FETCH_SINGLE_COIN:
            return action.payload;
        default:
            return coin;
    }
}

// export const selectCoinReducer = (selectedCoin = {},action) => {
//     switch(action.type) {
//         case SELECT_COIN:
//             return action.payload;
//         default:
//             return selectedCoin;
//     }
// }

export default combineReducers({
    currencies : fetchCurrencyReducer,
    selectedCurrency : selectCurrencyReducer,
    coins : fetchCoinsReducer,
    coin : fetchSingleCoinReducer,
    // selectedCoin : selectCoinReducer
});