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




export function formatNumber(n,decimalDigits) {
    const formatNumber = commaNumber.bindWith(",");
    return formatNumber(Number(n).toFixed(decimalDigits));
}