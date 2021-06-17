import React from "react";

import SuggestionListItem from "./SuggestionListItem";

import "./searchBar.css";
import "./suggestionList.css";

const SuggestionList = ({suggestions}) => {
    
    const getFinalRender = () => {
        
        return suggestions.map(suggestion => {
            return (
                <SuggestionListItem key={suggestion.uuid ? suggestion.uuid : "NOT_FOUND"} coin={suggestion} />
            )
        });
    };

    return (
        <div className="suggestionList">
            {getFinalRender()}
        </div>
    )
}


export default SuggestionList;