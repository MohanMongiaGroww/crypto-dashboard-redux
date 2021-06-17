import React from "react";

const MarketTableHeading = ({currency,whenHeadingIsClicked}) => {

    const style = {
        "marginBottom":"20px"
    }

    const onHeadingClick = (e) => {
        whenHeadingIsClicked(e.target.id);
    }

    return (
        <div className="marketTableHeading101CoinPage" style={style}>
            <div id="name" onClick={onHeadingClick}>
                Market
            </div>
            <div id="price" onClick={onHeadingClick}>
                Price <span className="headinInfo">({currency?.symbol})</span>
            </div>
            <div id="ratio">
                Base/Quote
            </div>
            <div id="marketShare" onClick={onHeadingClick}>
                Market Share
            </div>
            <div id="btcPrice" onClick={onHeadingClick}>
                BTC Price
            </div>
        </div>
    )
};

export default MarketTableHeading;