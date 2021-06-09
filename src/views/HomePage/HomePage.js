import React, { Component } from 'react';

import SearchBar from "../../ui/SearchBar";

import {getAllCoins} from "../../utils/api";
import {ERROR_CODES,EXPIRY_INTERVAL} from "../../utils/constants";
import {setLocalStorageItem,checkIfLocalStorageDataExpired,getLocalStorageItem} from "../../utils/helpers";

class HomePage extends Component {
    
    state={
        coins:[],
        error: ""
    }

    componentDidMount() {
        if(!checkIfLocalStorageDataExpired("Coins","Expiry")) 
        {
            this.setState({
                coins : getLocalStorageItem("Coins")
            });
            return;
        }

        getAllCoins()
            .then(result => {
                if(result.status === ERROR_CODES.SUCCESS)
                {
                    this.setState({
                        coins : result.data.data.coins
                    },() => {
                        setLocalStorageItem("Coins",JSON.stringify(this.state.coins));
                        setLocalStorageItem("Expiry",Date.now()+EXPIRY_INTERVAL.LOCAL_STORAGE_REFRESH_INTERVAL)
                    });
                }
            })
            .catch(err => {
                if(err.response.status === ERROR_CODES.UNPROCESSABLE_ENTITY)
                {
                    this.setState({
                        error : err.response.data.message
                    })
                }
            });
    }
  
    render() {
        return (
            <div>
                <SearchBar />
                Home Page
            </div>
        )
    }
}

export default HomePage;
