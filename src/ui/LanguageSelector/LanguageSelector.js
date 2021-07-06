import React from "react";
import { connect } from "react-redux";
import { selectCurrency } from "../../store/actionCreators";

import "./languageSelector.css";

class LanguageSelector extends React.PureComponent {
  handleChange = (e) => {
    const currency = JSON.parse(e.target.value);
    this.props.selectCurrency(currency);
  };

  renderOptions = (cur) => {
    const selected = cur.uuid === this.props?.selectedCurrency?.uuid;
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

const mapStateToProps = (state) => {
  return {
    currencies: state.currencies,
    selectedCurrency: state.selectedCurrency,
  };
};

export default connect(mapStateToProps, { selectCurrency })(LanguageSelector);
