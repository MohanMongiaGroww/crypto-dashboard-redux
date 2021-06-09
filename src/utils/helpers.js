export function setLocalStorageItem (key,value) {
    localStorage.setItem(key,JSON.stringify(value));
}

export function checkIfLocalStorageDataExpired(coinKey,expiryKey,uuid) {
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