import React from "react";

import "./languageSelector.css";

class LanguageSelector extends React.PureComponent {
  handleChange = (e) => {
    const currency = JSON.parse(e.target.value);
    this.props.changeCurrency(currency);
  };

  renderOptions = (cur) => {
    const selected =
      JSON.stringify(cur) === JSON.stringify(this.props.selectedCurrency);
    if (!selected) {
      return (
        <option key={cur.uuid} value={JSON.stringify(cur)}>
          {cur.symbol}
        </option>
      );
    } else {
      return (
        <option key={cur.uuid} value={JSON.stringify(cur)} selected>
          {cur.symbol}
        </option>
      );
    }
  };

  render() {
    return (
      <div
        style={{ textAlign: "end", paddingRight: "10px", paddingTop: "10px" }}
      >
        <select onChange={this.handleChange} className="selectCurrency">
          {this.props.currencies.map((cur) => {
            return this.renderOptions(cur);
          })}
        </select>
      </div>
    );
  }
}

export default LanguageSelector;
