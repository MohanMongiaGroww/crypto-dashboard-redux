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
            <div id="price" className="addBorder" onClick={onHeadingClick}>
                Price <span className="currency101HomePage headinInfo101HomePage">({currency.symbol})</span>
            </div> 
            <div id="marketCap" className="addBorder" onClick={onHeadingClick}>
                Market Cap <span className="currency101HomePage headinInfo101HomePage">({currency.symbol})</span>
            </div>
            <div id="btcPrice" className="addBorder" onClick={onHeadingClick}>
                Price <span className="headinInfo101HomePage">(BTC)</span>
            </div>
        </div>
    )
};

export default TableHeading;