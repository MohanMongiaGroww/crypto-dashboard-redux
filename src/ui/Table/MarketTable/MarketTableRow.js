import React from "react";

import { formatNumber } from "../../../utils/helpers";

const MarketTableRow = ({ market, currency }) => {
  return (
    <div
      className="marketTableEntry101CoinPage"
      style={{
        borderTopLeftRadius: "12px",
        borderBottomLeftRadius: "12px",
        borderTopRightRadius: "5px",
        borderBottomRightRadius: "5px",
        marginBottom: "20px",
        border: "2px solid #050f2e",
      }}
    >
      <div className="cryptoName">
        <img
          src={market.exchange.iconUrl}
          className="cryptoIcon"
          alt={market.exchange.symbol}
        />
        <span className="coinName">{market.exchange.name}</span>
      </div>
      <div>
        <img
          src={currency?.iconUrl}
          alt={`${currency?.symbol}`}
          className="currencyIcon"
        />
        <span>{formatNumber(market.price, 6)}</span>
      </div>
      <div>{`${market.base.symbol}/${market.quote.symbol}`}</div>
      <div>{`${market.marketShare}`}</div>
      <div className="btcPrice">{`${formatNumber(market.btcPrice, 6)}`}</div>
    </div>
  );
};

export default MarketTableRow;
