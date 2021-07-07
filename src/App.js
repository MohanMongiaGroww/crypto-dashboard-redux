import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "./views/HomePage/HomePage";
import CoinPage from "./views/CoinPage/CoinPage";
import PageNotFound from "./views/PageNotFound/PageNotFound";

import { fetchCurrencies } from "./store/actionCreators";

import defaultCoinSVG from "./static/defaultCoin.svg";

class App extends Component {

  componentDidMount() {
      let currencies = this.props.currencies;
      if(currencies === null || currencies === undefined || currencies.length === 0)
      {
        this.props.fetchCurrencies();
      }
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
