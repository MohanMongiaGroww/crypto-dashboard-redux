import React from "react";

import {formatNumber} from "../utils/helpers";


const MarketTableRow = ({market,currency}) => {
    
    return (
        <div
            className="coinTableEntry101HomePage addBorder" 
            style={{
                borderTopLeftRadius:'12px',
                borderBottomLeftRadius:'12px',
                borderTopRightRadius:'5px',
                borderBottomRightRadius:'5px',
                border:"1px solid red",
            }}
            >
            <div className="cryptoName addBorder">
                <img src={market.exchange.iconUrl} className="cryptoIcon" alt={market.exchange.symbol}/><span className="coinName">{market.exchange.name}</span>
            </div>
            <div className="addBorder">
                <img src={currency?.iconUrl} alt={`${currency?.symbol}`} className="currencyIcon" />
                <span>{formatNumber(market.price,6)}</span>
            </div>
        </div>
    )
};

export default MarketTableRow;