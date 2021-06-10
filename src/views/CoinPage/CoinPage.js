import React, { Component } from 'react';
import {getSingleCoin} from "../../utils/api";
import {ERROR_CODES} from "../../utils/constants";

import "./coinPage.css";

class CoinPage extends Component {
    
    state={
        coin:{},
        uuid : "",
        error : ""
    }

    apiCallTimerId = null;

    apiCallerFunction = () => {
        getSingleCoin(this.state.uuid)
        .then(result => {
            if(result.status === ERROR_CODES.SUCCESS)
            {
                this.setState({
                    coin : result.data.data.coin
                },() => {
                    localStorage.setItem("coin",JSON.stringify(this.state.coin));
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
            else if(err.response.status === ERROR_CODES.COIN_NOT_FOUND)
            {
                this.setState({
                    error : err.response.data.message
                })
            }
        });
    }

    apiCaller = () => {
        this.apiCallTimerId =  setInterval(this.apiCallerFunction,20000);
    }

    componentDidMount() {

        const coin = JSON.parse(localStorage.getItem("coin"));
        if(coin.uuid === this.props.match.params.uuid)
        {
            this.setState({
                coin : coin
            })
        }

        this.setState({
            uuid:this.props.match.params.uuid
        },() => {
            Promise.resolve()
                .then(() => {
                    this.apiCallerFunction();
                })
                .then(result => this.apiCaller())
                .catch(err => {
                    console.log(err);
                })
        })
    }

    componentWillUnmount() {
        if(this.apiCallTimerId)
        {
            clearInterval(this.apiCallTimerId);
            this.apiCallTimerId=null;
        }
    }

    getFinalRender = () => {
        const coinDataRecieved = JSON.stringify(this.state.coin) !== JSON.stringify({});
        return (
            coinDataRecieved ? 
            <div>
                <div>
                    <div>
                        <a href={this.state.coin.websiteUrl} >
                            <img src={this.state.coin.iconUrl} className="cryptoIcon" alt="crypto-icon"/>
                            {this.state.coin.name}({this.state.coin.symbol})
                        </a>
                    </div>
                    <div>
                        {this.state.coin.price}
                    </div>
                </div>
                <div>
                    <div>
                        Rank : {this.state.coin.rank}
                    </div>
                    <div>
                        Supply : {this.state.coin?.supply?.total}
                    </div>
                    <div>
                        All Time High : {this.state.coin.allTimeHigh?.price}
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{__html:`${this.state.coin.description}`}}>
                    
                </div>
            </div> : null
        )
    }
  
    render() {
        return (
            this.getFinalRender()
        )
    }
}

export default CoinPage;
