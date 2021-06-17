import React from "react";

const MarketTableHeading = ({currency}) => {


    return (
        <div className="coinTableHeading101HomePage">
            <div id="name">
                Market
            </div>
            <div id="price" className="addBorder">
                Price <span className="currency101HomePage headinInfo101HomePage">({currency?.symbol})</span>
            </div>
        </div>
    )
};

export default MarketTableHeading;