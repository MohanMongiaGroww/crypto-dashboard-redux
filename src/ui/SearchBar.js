import React, { Component } from 'react'

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
            <div>
                <input type="text" value={this.state.term} onChange={this.onTermChange} />
            </div>
        )
    }
}

export default SearchBar;
