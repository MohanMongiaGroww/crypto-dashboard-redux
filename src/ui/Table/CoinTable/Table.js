import React from "react";

import TableRow from "./TableRow";
import TableHeading  from "./TableHeading";

import "../table.css";

const Table = ({coins,whenHeadingIsClicked,currency}) => {

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
                    <TableRow key={coin.uuid} coin={coin} currency={currency} />
                )
            });
        }
    }

   

    return (
            <div className="coinTableParent101HomePage">
                <div className="coinTable101HomePage">
                    <TableHeading whenHeadingIsClicked={whenHeadingIsClicked} currency={currency} />
                    <div>
                        {coinsEntry()}
                    </div>
                </div>
            </div>
    )

};

export default Table;