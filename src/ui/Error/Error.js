import React from "react";

import "./error.css";

const Error = ({ error }) => {
  if (error && error.length !== 0) {
    return <div className="errorDiv">{error}</div>;
  } else {
    return null;
  }
};

export default Error;
