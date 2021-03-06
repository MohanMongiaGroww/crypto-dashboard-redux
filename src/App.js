import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./views/HomePage/HomePage";
import CoinPage from "./views/CoinPage/CoinPage";
import PageNotFound from "./views/PageNotFound/PageNotFound";

import { getFiatCurrencies } from "./utils/api";
import { DEFAULT_CURRENCY, ERROR_CODES } from "./utils/constants";
import { getLocalStorageItem, setLocalStorageItem } from "./utils/helpers";

import defaultCoinSVG from "./static/defaultCoin.svg";

class App extends Component {
  state = {
    currencies: [],
    selectedCurrency: DEFAULT_CURRENCY.USD_DOLLAR,
  };

  setCurrency = (newCurrency) => {
    this.setState({
      selectedCurrency: newCurrency,
    });
    setLocalStorageItem("selectedCurrency", newCurrency);
  };

  getCurrencies = () => {
    getFiatCurrencies()
      .then((result) => {
        const currencies = result.data?.data?.currencies;
        if (currencies === null || currencies === undefined) {
          return;
        }
        this.setState({
          currencies: currencies,
          selectedCurrency: currencies[DEFAULT_CURRENCY.INDEX],
        });
        setLocalStorageItem("currencies", currencies);
        setLocalStorageItem(
          "selectedCurrency",
          currencies[DEFAULT_CURRENCY.INDEX]
        ); // by default USD currency is selected
      })
      .catch((err) => {
        if (err.response?.status === ERROR_CODES.UNPROCESSABLE_ENTITY) {
          this.setState({
            error: err.response.data.message,
          });
        } else if (err.response?.status === ERROR_CODES.COIN_NOT_FOUND) {
          this.setState({
            error: err.response.data.message,
          });
        } else {
          this.setState({
            error: err.message,
          });
        }
      });
  };

  componentDidMount() {
    const getCurrencies = getLocalStorageItem("currencies");
    let getSelectedCurrency = getLocalStorageItem("selectedCurrency");
    if (getCurrencies === null || getCurrencies === undefined) {
      this.getCurrencies();
    } else {
      if (getSelectedCurrency === null || getSelectedCurrency === undefined) {
        getSelectedCurrency = getCurrencies[DEFAULT_CURRENCY.INDEX]; // USD currency
      }
      this.setState({
        currencies: getCurrencies,
        selectedCurrency: getSelectedCurrency,
      });
    }
  }

  getCoinForCoinPage = (uuid) => {
    let coin = {
      color: "#800080",
      iconUrl: defaultCoinSVG,
      symbol: "Icon",
    };
    const coins = JSON.parse(localStorage.getItem("Coins"));
    if (coins && coins.length !== 0) {
      const myCoin = coins.filter((coin) => {
        return coin.uuid === uuid;
      });
      if (myCoin.length === 1) {
        coin = myCoin[0];
      }
    }
    return coin;
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <HomePage
                  selectedCurrency={
                    this.state.selectedCurrency !== null
                      ? this.state.selectedCurrency
                      : DEFAULT_CURRENCY.USD_DOLLAR
                  }
                  currencies={this.state.currencies}
                  setCurrency={this.setCurrency.bind(this)}
                />
              );
            }}
          />
          <Route
            exact
            path="/coin/:uuid"
            render={(props) => {
              return (
                <CoinPage
                  {...props}
                  coin={this.getCoinForCoinPage(props.match.params.uuid)}
                  currencies={this.state.currencies}
                  selectedCurrency={
                    this.state.selectedCurrency
                      ? this.state.selectedCurrency
                      : DEFAULT_CURRENCY.USD_DOLLAR
                  }
                  setCurrency={this.setCurrency.bind(this)}
                />
              );
            }}
          />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
