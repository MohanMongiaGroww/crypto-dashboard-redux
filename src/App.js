import React, { Component } from "react";

import HomePage from "./views/HomePage/HomePage";
import CoinPage from "./views/CoinPage/CoinPage";
import PageNotFound from "./views/PageNotFound/PageNotFound";

import { getFiatCurrencies } from "./utils/api";
import { DEFAULT_CURRENCY } from "./utils/constants";
import { getLocalStorageItem, setLocalStorageItem } from "./utils/helpers";

import {BrowserRouter as Router,Route,Switch} from "react-router-dom";

class App extends Component {

    state={
        currencies : [],
        selectedCurrency : DEFAULT_CURRENCY.USD_DOLLAR
    }

    setCurrency = (newCurrency) => {
        this.setState({
            selectedCurrency : newCurrency
        });
        setLocalStorageItem("selectedCurrency",newCurrency);
    }

    getCurrencies = () => {
        getFiatCurrencies()
            .then(result => {
                const currencies = result.data?.data?.currencies;
                if(currencies === null || currencies===undefined)
                {
                    return;
                }
                this.setState({
                    currencies : currencies,
                    selectedCurrency : currencies[DEFAULT_CURRENCY.INDEX]
                });
                setLocalStorageItem("currencies",currencies);
                setLocalStorageItem("selectedCurrency",currencies[DEFAULT_CURRENCY.INDEX]); // by default USD currency is selected
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        const getCurrencies = getLocalStorageItem("currencies");
        let getSelectedCurrency = getLocalStorageItem("selectedCurrency");
        if(getCurrencies === null || getCurrencies === undefined)
        {
            this.getCurrencies();
        }
        else
        {
            if(getSelectedCurrency === null || getSelectedCurrency === undefined)
            {
                getSelectedCurrency = getCurrencies[DEFAULT_CURRENCY.INDEX]; // USD currency
            }
            this.setState({
                currencies : getCurrencies,
                selectedCurrency: getSelectedCurrency
            })
        }
    }


    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={() => {
                        return <HomePage 
                                selectedCurrency={this.state.selectedCurrency !== null  ? this.state.selectedCurrency : DEFAULT_CURRENCY.USD_DOLLAR}
                                currencies={this.state.currencies}
                                setCurrency={this.setCurrency.bind(this)}
                                />
                    }} />
                    <Route exact path="/coin/:uuid" render={(props) => { 
                        let coin = {
                            color : '#800080',
                            symbol : "Icon"
                        };
                        const getCoin = () =>{
                            const coins = JSON.parse(localStorage.getItem("Coins"));
                            if(typeof coins && typeof({}) && coins.length !==0)
                            {
                                const myCoin = coins.filter(coin => {
                                    return coin.uuid === props.match.params.uuid;
                                });
                                if(myCoin.length === 1)
                                {
                                    coin = myCoin[0];
                                }
                            }
                        }
                        getCoin();
                        return <CoinPage 
                                {...props} 
                                coin = {coin} 
                                currencies={this.state.currencies} 
                                selectedCurrency={this.state.selectedCurrency ? this.state.selectedCurrency : DEFAULT_CURRENCY.USD_DOLLAR} 
                                setCurrency = {this.setCurrency.bind(this)}
                                />
                    }} />
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </Router>
        )
    }
}

export default App;
