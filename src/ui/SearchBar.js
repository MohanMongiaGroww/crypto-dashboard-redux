import React, { Component } from 'react';

import "./searchBar.css";

class SearchBar extends Component {
    
    state = {
        term : ""
    }

    onTermChange = (e) => {
        console.log(e.target.value);
        this.setState({
            term : e.target.value
        });
    }
    
    render() {
        return (
            <div className="searchBarHolder">
                <label className="searchBarLabel" htmlFor="coinSearchBar">Coin :</label>
                <input id="coinSearchBar" type="text" value={this.state.term} className="coinSearchBar" onChange={this.onTermChange} />
            </div>
        )
    }
}

export default SearchBar;
