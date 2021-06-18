import React from "react";
import {Link} from 'react-router-dom';

import {formatNumber} from "../../../utils/helpers";


const TableRow = ({coin,currency}) => {
    
    const linkStyle = {
        'color' : "white",
        "padding" : '5px',
        "textDecoration" : "none"
    }

    return (
        <Link to={`/coin/${coin.uuid}`} style={linkStyle}>
            <div
                className="coinTableEntry101HomePage" 
                style={{
                    borderLeft : ` 7px solid ${coin.color ? coin.color : 'purple'}` , 
                    borderTopLeftRadius:'12px',
                    borderBottomLeftRadius:'12px',
                    borderTopRightRadius:'5px',
                    borderBottomRightRadius:'5px',

                }}
                >
                <div className="cryptoName">
                    <img src={coin.iconUrl} className="cryptoIcon" alt={coin.symbol}/><span className="coinName">{coin.name}</span>
                </div>
                <div>
                    <img src={currency.iconUrl} alt={`${currency.symbol}`} className="currencyIcon" />
                    <span>{formatNumber(coin.price,6)}</span>
                </div>
                <div>
                    <img src={currency.iconUrl} alt={`${currency.symbol}`} className="currencyIcon" />
                    <span>{formatNumber(coin.marketCap,3)}</span>
                </div>
                <div>
                    <span>{formatNumber(coin.btcPrice,10)}</span>
                </div>
            </div>
        </Link>
    )
};

export default TableRow;