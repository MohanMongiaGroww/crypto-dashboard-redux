import React, { Component } from 'react';
import SparkLine from 'react-canvas-spark-line';


import LanguageSelector from "../../ui/LanguageSelector";
import Loader from "../../ui/Loader";
import HeadingH1 from '../../ui/HeadingH1';
import HeadingH2 from '../../ui/HeadingH2';
import MarketTable from '../../ui/MarketTable';
import AllLinks from '../../ui/AllLinks';
// import SparkLine from '../../ui/SparkLine';


import {getSingleCoin,getCoinMarkets} from "../../utils/api";
import {ERROR_CODES} from "../../utils/constants";
import { formatNumber, setLocalStorageItem ,getLocalStorageItem} from '../../utils/helpers';

import "./coinPage.css";

class CoinPage extends Component {
    
    state={
        coin:{},
        markets:[],
        uuid : "",
        error : ""
    }

    sortingBool = {
        "price" : true,
        "name" : true,
        "btcPrice" : true,
        "marketShare" : true
    }

    doSorting = (sortedMarkets,field) => {
        sortedMarkets.sort((marketA,marketB) => {
            const ascending = this.sortingBool[field];
            if(field === "name")
            {
                return ascending ? (marketA.exchange[field] > marketB.exchange[field] ? 1 : -1) : (marketA.exchange[field] < marketB.exchange[field] ? 1 : -1)
            }
            return ascending ? marketB[field] - marketA[field] : marketA[field] - marketB[field];
        });

    }

    whenHeadingIsClicked = (field) => {
        const sortedMarkets = [...this.state.markets];

        this.doSorting(sortedMarkets,field);
        
        this.sortingBool[field] = !this.sortingBool[field];

        this.setState({
            markets : [...sortedMarkets]
        });
    }

    coinApiCallTimerId = null;
    marketApiCallTimerId = null;

    coinApiCallerFunction = () => {
        getSingleCoin(this.state.uuid,this.props.selectedCurrency.uuid)
        .then(result => {
            if(result.status === ERROR_CODES.SUCCESS)
            {
                this.setState({
                    coin : result.data.data.coin
                },() => {
                    setLocalStorageItem("coin",this.state.coin);
                });
            }
        })
        .catch(err => {
            if(err.response?.status === ERROR_CODES.UNPROCESSABLE_ENTITY)
            {
                this.setState({
                    error : err.response.data.message
                })
            }
            else if(err.response?.status === ERROR_CODES.COIN_NOT_FOUND)
            {
                this.setState({
                    error : err.response.data.message
                })
            }
        });
    }

    marketApiCallerFunction = () => {
        getCoinMarkets(this.state.uuid,this.props.selectedCurrency.uuid)
            .then(result => {
                if(result.status === ERROR_CODES.SUCCESS)
                {
                    this.setState({
                        markets : result.data.data.markets
                    },() => {
                        setLocalStorageItem("markets",this.state.markets);
                    });
                }
            })
            .catch(err => {
                
                if(err.response?.status === ERROR_CODES.UNPROCESSABLE_ENTITY)
                {
                    this.setState({
                        error : err.response.data.message
                    })
                }
                else if(err.response?.status === ERROR_CODES.COIN_NOT_FOUND)
                {
                    this.setState({
                        error : err.response.data.message
                    })
                }
            });
    }

    apiCaller = () => {
        this.coinApiCallTimerId =  setInterval(this.coinApiCallerFunction,20000);
        this.marketApiCallTimerId =  setInterval(this.marketApiCallerFunction,20000);
    }

    componentDidMount() {

        const markets =  getLocalStorageItem("markets");
        if(markets)
        {
            this.setState({
                markets:markets
            });
        }
        
        const coin = JSON.parse(localStorage.getItem("coin"));
        if(coin && coin.uuid === this.props.match.params.uuid)
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
                    this.coinApiCallerFunction();
                    this.marketApiCallerFunction();
                })
                .then(result => this.apiCaller())
                .catch(err => {
                    console.log(err);
                })
        })
    }

    componentWillUnmount() {
        if(this.coinApiCallTimerId)
        {
            clearInterval(this.coinApiCallTimerId);
            this.coinApiCallTimerId=null;
        }
        if(this.marketApiCallTimerId)
        {
            clearInterval(this.marketApiCallTimerId);
            this.marketApiCallTimerId=null;
        }
    }

    shouldComponentUpdate(nextProps,newState) {
        if(JSON.stringify(this.props.selectedCurrency) !== JSON.stringify(nextProps.selectedCurrency))
        {
            if(this.coinApiCallTimerId)
            {
                clearInterval(this.coinApiCallTimerId);
                this.coinApiCallTimerId = null;
            }
            if(this.marketApiCallTimerId)
            {
                clearInterval(this.marketApiCallTimerId);
                this.marketApiCallTimerId=null;
            }
            Promise.resolve()
                .then(() => {
                    this.coinApiCallerFunction();
                    this.marketApiCallerFunction();
                })
                .then(result => this.apiCaller())
                .then(result => true)
                .catch(err => {
                    console.log(err);
                });
        }
        if(JSON.stringify(newState.coin) !== JSON.stringify(this.state.coin))
        {
            return true;
        }
        if(JSON.stringify(newState.markets) !== JSON.stringify(this.state.markets))
        {
            return true;
        }
        if(JSON.stringify(newState.error) !== JSON.stringify(this.state.error))
        {
            return true;
        }
        if(JSON.stringify(newState.uuid) !== JSON.stringify(this.state.uuid))
        {
            return true;
        }
        
        return false;
    }
    
    coinPageDivRef = React.createRef();

    whenCoinPageDivLoaded = () => {
        this.coinPageDivRef.current.classList.add("coinPageDivRemoveOpaque");
    }

    linkStyle = {
        'color' : "#E0E4ED",
        "textDecoration" : "none",
        "fontWeight" : 900
    }

    headingStyle = {}

    priceChangeStyles = () => {
        const change = Number.parseFloat(this.state.coin.change);
        let result = {};
        if( change > 0)
        {
            result = {
                "color" : "rgb(0, 255, 0)",
            }
        }
        else if(change < 0)
        {
            result = {
                "color" : "rgb(235, 29, 29)"
            }
        }
        else
        {
            result = {
                "color" : "rgb(206, 206, 206)"
            }
        }
        return result;
    }

    getPriceChange = () => {
        const increase = this.state.coin.change > 0 ? 1 : 0; 
        if(increase === 1)
        {
            return `+${formatNumber(this.state.coin.change,2)}%`;
        }
        return `${formatNumber(this.state.coin.change,2)}%`;

    }

    getFinalRender = () => {
        const coinDataRecieved = JSON.stringify(this.state.coin) !== JSON.stringify({});
        return (
            coinDataRecieved ? 
            <div className="parentContainer101CoinPage">
                <LanguageSelector selectedCurrency={this.props.selectedCurrency} currencies={this.props.currencies} changeCurrency={this.props.setCurrency}/>
                <div className="coinPageContainer">
                    <div ref={this.coinPageDivRef} className="coinPageDiv coinPageDivOpaque" onLoad={this.whenCoinPageDivLoaded}>
                        <div className="nameAndPriceDiv101CoinPage">
                            <div className="coinIconAndName101CoinPage">
                                <a target="__blank" href={`${this.state.coin.websiteUrl}`} style={this.linkStyle} >
                                    <div>
                                        <img src={this.state.coin.iconUrl} className="cryptoIconCoinPage" alt="crypto-icon"/>
                                    </div>
                                    <div className="nameHeading101CoinPage">
                                        {this.state.coin.name}({this.state.coin.symbol})
                                    </div>
                                </a>
                            </div>
                            <div className="coinPrices">
                                <HeadingH2 className="heading101CoinPage" text="Price" color={this.state.coin.color} />
                                <div className="coinPricesChild">
                                    <div>
                                        <img src={this.props.selectedCurrency.iconUrl} className="priceIcon" alt="SYM"/>
                                        <div>{formatNumber(this.state.coin.price,6)}</div>
                                    </div>
                                    <div>
                                        <span className="priceChange101CoinPage" style={this.priceChangeStyles()}>({this.getPriceChange()})</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="coinDetails">
                            <div>
                                <HeadingH2 className="heading101CoinPage" text="Rank" color={this.state.coin.color} />
                                <div className="coinInfo">
                                    {this.state.coin.rank}
                                </div>
                            </div>
                            <div>
                                <HeadingH2 className="heading101CoinPage" text="Supply" color={this.state.coin.color} />
                                <div className="coinInfo">
                                    {formatNumber(this.state.coin?.supply?.total)}
                                </div>
                            </div>
                            <div>
                                <HeadingH2 className="heading101CoinPage" text="All Time High" color={this.state.coin.color} />
                                <div className="coinInfo">
                                    <img src={this.props.selectedCurrency.iconUrl} className="priceIcon" alt="SYM"/>
                                    <span>{formatNumber(this.state.coin.allTimeHigh?.price,6)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="description101CoinPage">
                            <HeadingH1 text="About" color={this.state.coin.color}/>
                            <div dangerouslySetInnerHTML={{__html:`${this.state.coin.description || "No Description Available" }`}} >

                            </div>
                            
                        </div>
                        <div className="sparkLine">
                            <HeadingH1 text="Chart" color={this.state.coin.color} />
                            <div>
                                <SparkLine
                                    data={this.state.coin.sparkline} 
                                    height={200} 
                                    width={600}
                                    animate
                                    animationDuration={2000} // Default: 1000 (milliseconds)
                                    color={this.state.coin.color ? this.state.coin.color : "aqua"}
                                    includeZero={false} // Default: true
                                    areaOpacity={1}
                                    areaColor={[this.state.coin.color ? this.state.coin.color : "aqua", 'white']}
                                />
                            </div>
                        </div>
                        <div className="market101CoinPage">
                            <HeadingH1 text="Market" color={this.state.coin.color} />
                            <MarketTable 
                                markets={this.state.markets} 
                                currency={this.props.selectedCurrency}
                                whenHeadingIsClicked={this.whenHeadingIsClicked}    
                            />
                        </div>
                        <div className="visitLinks">
                            <HeadingH1 text="Links" color={this.state.coin.color} />
                            <AllLinks links={this.state.coin.links} />
                        </div>
                    </div>
                </div>
            </div> : <Loader coin={this.props.coin} />
        )
    }
  
    render() {
        return (
                this.getFinalRender()
        )
    }
}

export default CoinPage;
