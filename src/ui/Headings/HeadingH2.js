import React from "react";

const HeadingH2 = ({ text, color }) => {
  const style = {
    color: `${color ? color : "white"}`,
    fontWeight: "900",
    margin: "0px",
  };
  return <h2 style={style}>{text} &ensp; |</h2>;
};

export default HeadingH2;
