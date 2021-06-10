import React from "react";

import "./table.css";
import TableRow from "./Table.Row";

const Table = ({coins,whenHeadingIsClicked}) => {

    const coinsEntry = () => {
        const isCoinsEmpty = coins.length === 0;

        if(isCoinsEmpty)
        {
            return <div>No data Found. Please Refresh</div>
        }
        else
        {
            return coins.map(coin => {
                return (
                    <TableRow coin={coin}  />
                )
            });
        }
    }

    const onHeadingClick = (e) => {
        whenHeadingIsClicked(e.target.id);
    }

    return (
            <div className="coinTable">
                <div className="coinTableHeading">
                    <div id="name" onClick={onHeadingClick}>
                        Coin
                    </div>
                    <div id="price" className="addBorder" onClick={onHeadingClick}>
                        Price
                    </div> 
                    <div id="marketCap" className="addBorder" onClick={onHeadingClick}>
                        Market Cap
                    </div>
                    <div id="price" className="addBorder" onClick={onHeadingClick}>
                        Price (BTC)
                    </div>
                </div>
                <div>
                    {coinsEntry()}
                </div>
            </div>
    )

};

export default Table;