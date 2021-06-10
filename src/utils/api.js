import axios from "axios";

import {KEYS} from "./constants";
import {ROUTES} from "./apiRoutes";

const axiosInstance = axios.create({
    // baseURL:"https://cors-anywhere.herokuapp.com/https://api.coinranking.com/",
    headers:{
        "x-access-token": KEYS.API_KEY,
        "pragma": "no-cache",
        "cache-control": "no-cache"
    }
});

export function getAllCoins() {
    return axiosInstance.get(ROUTES.ALL_COINS);
}

export function getSingleCoin(uuid) {
    return axiosInstance.get(`${ROUTES.SINGLE_COIN}${uuid}`);
}
