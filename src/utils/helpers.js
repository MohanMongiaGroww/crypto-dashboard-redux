import commaNumber from "comma-number";

export function checkIfLocalStorageDataExpired(coinKey,expiryKey,uuid=null) {
    const Expiry = Number.parseInt(localStorage.getItem(expiryKey));
    
    let ifDataValid;
    if(coinKey === "coin")
    {
        const coin =  JSON.parse(localStorage.getItem(coinKey));
        ifDataValid = coin?.uuid === uuid && Expiry &&  Expiry>Number.parseInt(Date.now());

        if(ifDataValid)
        {
            return false;
        }
    }
    else if(coinKey === "Coins")
    {
        const Coins =  JSON.parse(localStorage.getItem(coinKey));
        ifDataValid = Coins && Expiry && Expiry>Number.parseInt(Date.now());
    
        if(ifDataValid)
        {
            return false;
        }
    }
    return true;
}

export function getLocalStorageItem(key) {
    return  JSON.parse(localStorage.getItem(key));
}

export function setLocalStorageItem(key,value) {
    const val = JSON.stringify(value)
    localStorage.setItem(key,val);
}


export function formatNumber(n,decimalDigits) {
    let number = Number(n);
    let referenceValue = "";
    if(number > Math.pow(10,9))
    {
        referenceValue = "B";
        number = number / (Math.pow(10,9));
    }
    else if(number > Math.pow(10,6))
    {
        referenceValue = "M";
        number = number / (Math.pow(10,6));
    }
    else if(number > Math.pow(10,3))
    {
        referenceValue = "K";
        number = number / (Math.pow(10,3));
    }
    const formatNumber = commaNumber.bindWith(",");
    const isReferenceValueAvailable = referenceValue.length !== 0;
    if(Number.parseInt(number)===number)
    {
        if(isReferenceValueAvailable)
            return `${formatNumber(number)} (${referenceValue})`;
        return `${formatNumber(number)}`;
    }
    else if(number > 1)
    {
        if(isReferenceValueAvailable)
        {
            return `${formatNumber(number.toFixed(3))} (${referenceValue})`;
        }
        return `${formatNumber(number.toFixed(3))}`;
    }

    if(isReferenceValueAvailable)
        return `${formatNumber(number.toFixed(decimalDigits))} (${referenceValue})`;
    return `${formatNumber(number.toFixed(decimalDigits))}`;
    
}

export function getCoinSuggestion (value,coins) {
    if(coins.length === 0) 
    {
        return [];
    }
    value = value.toLowerCase();
    return coins.filter(coin => {
        let coinName = coin.name.toLowerCase();
        let coinSymbol = coin.symbol.toLowerCase();
        let valueLength = value.length;
        if(coinName.length >= valueLength)
        {
            if(coinName.substr(0,valueLength) === value)
                return true;
        }
        if(coinSymbol.length >= valueLength)
        {
            if(coinSymbol.substr(0,valueLength) === value)
                return true;
        }
        return false;
    });
}