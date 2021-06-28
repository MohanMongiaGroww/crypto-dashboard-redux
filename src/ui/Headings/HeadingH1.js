import React from "react";

const HeadingH1 = ({ text, color }) => {
  const style = {
    color: `${color ? color : "white"}`,
    fontWeight: "900",
    margin: "0px",
  };

  return <h1 style={style}>{text} &emsp; |</h1>;
};

export default HeadingH1;
