export const ERROR_CODES = {
    SUCCESS : 200,
    COIN_NOT_FOUND : 404,
    UNPROCESSABLE_ENTITY : 422
}

export const NO_RECORD = {
    COIN_NOT_FOUND : "No Coin found ..."
}

export const DEFAULT_CURRENCY = {
    INDEX : 0,    
    USD_DOLLAR : {
        uuid:"yhjMzLPhuIDl",
        type:"fiat",
        iconUrl:"https://cdn.coinranking.com/kz6a7w6vF/usd.svg",
        name:"US Dollar",
        symbol:"USD",
        sign:"$"
    }
}

export const REFRESH_TIMES = {
    API_REFETCH_TIME : 30000,
    SEARCH_BAR_SUGGESTIONS_TIME : 1000
}

export const CURRENCY_TYPES = {
    FIAT : "fiat"
}