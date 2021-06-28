import React from "react";

import { REFRESH_TIMES } from "../../utils/constants";

import CoinSVG from "../../static/coin.svg";

import "./searchBar.css";
class SearchBar extends React.Component {
  state = {
    term: "",
  };

  timerId = null;

  onTermChange = (e) => {
    const value = e.target.value;
    this.setState({
      term: value,
    });
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.timerId = setTimeout(
      this.props.whenSearchTermChanges,
      REFRESH_TIMES.SEARCH_BAR_SUGGESTIONS_TIME,
      value
    );
  };

  render() {
    return (
      <div className="parentSearchBar">
        <img src={CoinSVG} alt="coin" className="searchBarIcon" />
        <input
          id="coinSearchBar"
          type="text"
          value={this.state.term}
          className="coinSearchBar"
          onChange={this.onTermChange}
          placeholder="Enter Coin or Symbol ..."
        />
      </div>
    );
  }
}

export default SearchBar;
