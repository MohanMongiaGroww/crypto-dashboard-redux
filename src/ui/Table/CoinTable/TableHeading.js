import React from "react";

const TableHeading = ({whenHeadingIsClicked,currency}) => {

    const onHeadingClick = (e) => {
        whenHeadingIsClicked(e.target.id);
    }

    return (
        <div className="coinTableHeading101HomePage">
            <div id="name" onClick={onHeadingClick}>
                Coin
            </div>
            <div id="price" onClick={onHeadingClick}>
                Price <span className="headinInfo">({currency.symbol})</span>
            </div> 
            <div id="marketCap" onClick={onHeadingClick}>
                Market Cap <span className="headinInfo">({currency.symbol})</span>
            </div>
            <div id="btcPrice" onClick={onHeadingClick}>
                Price <span className="headinInfo">(BTC)</span>
            </div>
        </div>
    )
};

export default TableHeading;