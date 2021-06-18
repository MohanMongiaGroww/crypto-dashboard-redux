import React from "react";

import MarketTableRow from "./MarketTableRow";
import MarketTableHeading  from "./MarketTableHeading";

import "../table.css";

const MarketTable = ({markets,currency,whenHeadingIsClicked}) => {

    const marketsEntry = () => {
        const isMarketsEmpty = markets.length === 0;

        if(isMarketsEmpty)
        {
            return <div>No data Found. Please Refresh</div>
        }
        else
        {
            return markets.map(market => {
                return (
                    <MarketTableRow  key={market.uuid}  market={market} currency={currency} />
                )
            });
        }
    }

    return (
            <div className="marketTableParent101CoinPage">
                <div className="marketTable101CoinPage">
                    <MarketTableHeading whenHeadingIsClicked={whenHeadingIsClicked} currency={currency} />
                    <div>
                        {marketsEntry()}
                    </div>
                </div>
            </div>
    )

};

export default MarketTable;