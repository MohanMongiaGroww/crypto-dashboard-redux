import axios from "axios";

import {KEYS} from "./constants";
import {ROUTES} from "./apiRoutes";

const axiosInstance = axios.create({
    baseURL:"https://cors-anywhere.herokuapp.com/https://api.coinranking.com/v2/",
    headers:{
        "x-access-token": KEYS.API_KEY,
    }
});

export function getAllCoins() {
    return axiosInstance.get(ROUTES.ALL_COINS);
}

export function getSingleCoin(uuid) {
    return axiosInstance.get(`${ROUTES.SINGLE_COIN}${uuid}`);
}
