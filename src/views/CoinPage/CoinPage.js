import React, { Component } from 'react';
import {getSingleCoin} from "../../utils/api";
import { checkIfLocalStorageDataExpired, getLocalStorageItem } from '../../utils/helpers';

class CoinPage extends Component {
    
    state={
        coin:{}
    }

    componentDidMount() {
        if(!checkIfLocalStorageDataExpired("coin","coinExpiry"))
        {
            this.setState({
                coin : getLocalStorageItem("coin")
            });
            return;
        }

        getSingleCoin("razxDUgYGNAdQ")
            .then(result => console.log(result))
            .catch(error => console.log(error));
    }
  
    render() {
        return (
            <div>
                Coin Page
            </div>
        )
    }
}

export default CoinPage;
