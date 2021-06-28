import React from "react";

import "./loader.css";

const Loader = ({ coin }) => {
  const getHEXtoInt = (val) => {
    if (val >= 65 && val <= 70) {
      val = 10 + (val % 65);
    } else if (val >= 97 && val <= 102) {
      val = 10 + (val % 97);
    } else {
      val = val % 48;
    }
    return val;
  };
  const convertHEXtoRGBA = (color) => {
    if (color === null) {
      color = "#FFFFFF";
    }
    let resultColor = "rgba(";
    let tempColor = "";
    let power = 0;
    let sum = 0;
    for (let i = color.length - 1; i > 0; i--) {
      sum = sum + getHEXtoInt(color.charCodeAt(i)) * Math.pow(16, power);
      power++;
      if (i % 2 !== 0) {
        tempColor = "," + sum.toString() + tempColor;
        sum = 0;
        power = 0;
      }
    }
    tempColor = tempColor.slice(1);
    resultColor = resultColor + tempColor + ",0.5)";
    return resultColor;
  };
  const cryptoIconBorderColor = {
    border: `0px solid ${convertHEXtoRGBA(coin.color)}`,
  };

  return (
    <div className="loader">
      <div style={cryptoIconBorderColor}>
        <img
          src={coin.iconUrl}
          className="loaderCryptoIcon"
          alt={coin.symbol}
        />
      </div>
    </div>
  );
};

export default Loader;
