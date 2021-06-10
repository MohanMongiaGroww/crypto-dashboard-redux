import React from "react";
import {Link} from 'react-router-dom';

import {formatNumber} from "../utils/helpers";

import "./table.css";

const TableRow = ({coin}) => {
    
    const linkStyle = {
        'color' : "black",
        'border' : "1px solid white",
        "textDecoration" : "none",
    }

    return (
        <Link to={`/coin/${coin.uuid}`} style={linkStyle}>
                        <div
                            key={coin.uuid} 
                            className="coinTableEntry addBorder" 
                            style={{
                                borderLeft : ` 7px solid ${coin.color ? coin.color : 'purple'}` , 
                                borderTopLeftRadius:'12px',
                                borderBottomLeftRadius:'12px',
                                borderTopRightRadius:'5px',
                                borderBottomRightRadius:'5px',

                            }}
                            >
                            <div className="cryptoName addBorder">
                                <img src={coin.iconUrl} className="cryptoIcon" alt="crypto-icon"/><span className="coinName">{coin.name}</span>
                            </div>
                            <div className="addBorder">
                                {formatNumber(coin.price,6)}
                            </div>
                            <div className="addBorder">
                                {formatNumber(coin.marketCap,3)}
                            </div>
                            <div className="addBorder">
                                {formatNumber(coin.btcPrice,10)}
                            </div>
                        </div>
                    </Link>
    )
};

export default TableRow;