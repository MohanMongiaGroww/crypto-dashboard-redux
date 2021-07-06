import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "./views/HomePage/HomePage";
import CoinPage from "./views/CoinPage/CoinPage";
import PageNotFound from "./views/PageNotFound/PageNotFound";

import { fetchCurrencies } from "./store/actionCreators";

import defaultCoinSVG from "./static/defaultCoin.svg";

class App extends Component {

  getCurrencies = () => {
    this.props.fetchCurrencies();
    // getFiatCurrencies()
    //   .then((result) => {
    //     const currencies = result.data?.data?.currencies;
    //     if (currencies === null || currencies === undefined) {
    //       return;
    //     }
    //     this.setState({
    //       currencies: currencies,
    //       selectedCurrency: currencies[DEFAULT_CURRENCY.INDEX],
    //     });
    //     setLocalStorageItem("currencies", currencies);
    //     setLocalStorageItem(
    //       "selectedCurrency",
    //       currencies[DEFAULT_CURRENCY.INDEX]
    //     ); // by default USD currency is selected
    //   })
    //   .catch((err) => {
    //     if (err.response?.status === ERROR_CODES.UNPROCESSABLE_ENTITY) {
    //       this.setState({
    //         error: err.response.data.message,
    //       });
    //     } else if (err.response?.status === ERROR_CODES.COIN_NOT_FOUND) {
    //       this.setState({
    //         error: err.response.data.message,
    //       });
    //     } else {
    //       this.setState({
    //         error: err.message,
    //       });
    //     }
    //   });
  };

  componentDidMount() {
    // const getCurrencies = getLocalStorageItem("currencies");
    // let getSelectedCurrency = getLocalStorageItem("selectedCurrency");
    // if (getCurrencies === null || getCurrencies === undefined) {
      this.props.fetchCurrencies();
    // } else {
    //   if (getSelectedCurrency === null || getSelectedCurrency === undefined) {
    //     getSelectedCurrency = getCurrencies[DEFAULT_CURRENCY.INDEX]; // USD currency
    //   }
    //   this.setState({
    //     currencies: getCurrencies,
    //     selectedCurrency: getSelectedCurrency,
    //   });
    // }
  }

  getCoinForCoinPage = (uuid) => {
    let coin = {
      color: "#800080",
      iconUrl: defaultCoinSVG,
      symbol: "Icon",
    };
    const coins = this.props.coins
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
                <HomePage />
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
                  selectedCoin={this.getCoinForCoinPage(props.match.params.uuid)}
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

const mapStateToProps = (state) => {
  return {
    currencies : state.currencies,
    coins : state.coins
  }
}

export default connect(mapStateToProps, {fetchCurrencies})(App);
