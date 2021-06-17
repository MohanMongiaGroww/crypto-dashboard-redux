import React from "react";

const MarketTableHeading = ({currency,whenHeadingIsClicked}) => {

    const style = {
        "marginBottom":"20px"
    }

    const onHeadingClick = (e) => {
        console.log(e.target.id,"Clicked");
        whenHeadingIsClicked(e.target.id);
    }

    return (
        <div className="coinTableHeading101HomePage" style={style}>
            <div id="name" className="addBorder" onClick={onHeadingClick}>
                Market
            </div>
            <div id="price" className="addBorder" onClick={onHeadingClick}>
                Price <span className="currency101HomePage headinInfo101HomePage">({currency?.symbol})</span>
            </div>
            <div id="ratio" className="addBorder">
                Base/Quote
            </div>
            <div id="marketShare" className="addBorder" onClick={onHeadingClick}>
                Market Share
            </div>
            <div id="btcPrice" className="addBorder" onClick={onHeadingClick}>
                BTC Price
            </div>
        </div>
    )
};

export default MarketTableHeading;