import React, { Component } from "react";

import { getCoinSuggestion } from "../../utils/helpers";
import { NO_RECORD } from "../../utils/constants";

import SuggestionList from "../Suggestions/SuggestionList";
import SearchBar from "./SearchBar";

import "./searchBar.css";

class SearchBarHolder extends Component {
  state = {
    suggestions: [],
  };

  whenSearchTermChanges = (value) => {
    if (value.length === 0) {
      this.setState({
        suggestions: [],
      });
    } else {
      const matchingSuggestions = getCoinSuggestion(value, this.props.coins);
      if (matchingSuggestions && matchingSuggestions.length > 0) {
        this.setState({
          suggestions: matchingSuggestions,
        });
      } else if (value.length > 0) {
        this.setState({
          suggestions: [NO_RECORD.COIN_NOT_FOUND],
        });
      } else {
        this.setState({
          suggestions: [],
        });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="searchBarHolder">
          <div className="searchBar">
            <div className="searchBarLabel" htmlFor="coinSearchBar">
              Search :
            </div>
            <SearchBar whenSearchTermChanges={this.whenSearchTermChanges} />
          </div>
          <div className="suggestionListHolder">
            <SuggestionList suggestions={this.state.suggestions} />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBarHolder;
