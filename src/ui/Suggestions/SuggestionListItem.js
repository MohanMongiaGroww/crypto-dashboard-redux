import React from "react";
import { Link } from "react-router-dom";

import { NO_RECORD } from "../../utils/constants";

import "./suggestionList.css";

const SuggestionListItem = ({coin}) => {

    const linkStyle = {
        'color' : "black",
        "textDecoration" : "none",
        "fontWeight" : "600"
    }
    const itemStyle = {
        'borderBottom' : `3px solid ${coin.color!==null ? coin.color : 'black'}`,
        'borderRadius' : '10px',
    }

    const getFinalRender = () => {
        if(coin === NO_RECORD.COIN_NOT_FOUND)
        {
            return (
                <div className="noCoinFound suggestionListItem101SearchBarError">
                    {NO_RECORD.COIN_NOT_FOUND}
                </div>
            )
        }
        return (
            <Link to={coin.uuid ? `/coin/${coin.uuid}` : '' } style={linkStyle}>
                <div className="suggestionListItem101SearchBar" style={itemStyle}>
                    <img src={coin.iconUrl} className="cryptoIconSuggestion" alt="crypto-icon" />
                    <span className="coinNameSuggestion">{coin.name} &nbsp;({coin.symbol})</span>
                </div>
            </Link>
        )
    }

    return (
            // <div className="" style={itemStyle}>
                getFinalRender()
            // </div>
    )
};

export default SuggestionListItem;