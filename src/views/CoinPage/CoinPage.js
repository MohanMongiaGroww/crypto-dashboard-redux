import React, { Component } from "react";
import SparkLine from "react-canvas-spark-line";
import { connect } from "react-redux";

import HeadingH1 from "../../ui/Headings/HeadingH1";
import HeadingH2 from "../../ui/Headings/HeadingH2";
import LanguageSelector from "../../ui/LanguageSelector/LanguageSelector";
import Loader from "../../ui/Loader/Loader";
import MarketTable from "../../ui/Table/MarketTable/MarketTable";
import AllLinks from "../../ui/InfoLinks/AllLinks";
import Error from "../../ui/Error/Error";

import { getSingleCoin, getCoinMarkets } from "../../utils/api";
import { ERROR_CODES, REFRESH_TIMES } from "../../utils/constants";
import {
  formatNumber,
  setLocalStorageItem,
  getLocalStorageItem,
} from "../../utils/helpers";

import { fetchSingleCoin } from "../../store/actionCreators";

import "./coinPage.css";

class CoinPage extends Component {
  state = {
    coin: {},
    // markets: [],
    // uuid: "",
    error: "",
  };

  // sortingBool = {
  //   price: true,
  //   name: true,
  //   btcPrice: true,
  //   marketShare: true,
  // };

  // doSorting = (sortedMarkets, field) => {
  //   sortedMarkets.sort((marketA, marketB) => {
  //     const ascending = this.sortingBool[field];
  //     if (field === "name") {
  //       return ascending
  //         ? marketA.exchange[field] > marketB.exchange[field]
  //           ? 1
  //           : -1
  //         : marketA.exchange[field] < marketB.exchange[field]
  //         ? 1
  //         : -1;
  //     }
  //     return ascending
  //       ? marketB[field] - marketA[field]
  //       : marketA[field] - marketB[field];
  //   });
  // };

  // whenHeadingIsClicked = (field) => {
  //   const sortedMarkets = [...this.state.markets];

  //   this.doSorting(sortedMarkets, field);

  //   this.sortingBool[field] = !this.sortingBool[field];

  //   this.setState({
  //     markets: [...sortedMarkets],
  //   });
  // };

  // coinApiCallTimerId = null;
  // marketApiCallTimerId = null;

  // coinApiCallerFunction = () => {
  //   getSingleCoin(this.state.uuid, this.props.selectedCurrency.uuid)
  //     .then((result) => {
  //       if (result.status === ERROR_CODES.SUCCESS) {
  //         this.setState(
  //           {
  //             coin: result.data.data.coin,
  //           },
  //           () => {
  //             setLocalStorageItem("coin", this.props.coin);
  //           }
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.response?.status === ERROR_CODES.UNPROCESSABLE_ENTITY) {
  //         this.setState({
  //           error: err.response.data.message,
  //         });
  //       } else if (err.response?.status === ERROR_CODES.COIN_NOT_FOUND) {
  //         this.setState({
  //           error: err.response.data.message,
  //         });
  //       } else {
  //         this.setState({
  //           error: err.message,
  //         });
  //       }
  //     });
  // };

  // marketApiCallerFunction = () => {
  //   getCoinMarkets(this.state.uuid, this.props.selectedCurrency.uuid)
  //     .then((result) => {
  //       if (result.status === ERROR_CODES.SUCCESS) {
  //         this.setState(
  //           {
  //             markets: result.data.data.markets,
  //           },
  //           () => {
  //             setLocalStorageItem("markets", this.state.markets);
  //           }
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       if (err.response?.status === ERROR_CODES.UNPROCESSABLE_ENTITY) {
  //         this.setState({
  //           error: err.response.data.message,
  //         });
  //       } else if (err.response?.status === ERROR_CODES.COIN_NOT_FOUND) {
  //         this.setState({
  //           error: err.response.data.message,
  //         });
  //       } else {
  //         this.setState({
  //           error: err.message,
  //         });
  //       }
  //     });
  // };

  // apiCaller = () => {
  //   this.coinApiCallTimerId = setInterval(
  //     this.coinApiCallerFunction,
  //     REFRESH_TIMES.API_REFETCH_TIME
  //   );
  //   this.marketApiCallTimerId = setInterval(
  //     this.marketApiCallerFunction,
  //     REFRESH_TIMES.API_REFETCH_TIME
  //   );
  // };

  componentDidMount() {
    let coinUuid = this.props.selectedCoin.uuid;
    if (coinUuid === undefined || coinUuid === null) {
      let path = window.location.pathname;
      coinUuid = path.substr(6);
    }
    this.props.fetchSingleCoin(coinUuid);
    this.fetchSingleCoinTimerId = setInterval(
      this.props.fetchSingleCoin,
      REFRESH_TIMES.API_REFETCH_TIME,
      coinUuid
    );
    // const markets = getLocalStorageItem("markets");
    // if (markets) {
    //   this.setState({
    //     markets: markets,
    //   });
    // }

    // const coin = JSON.parse(localStorage.getItem("coin"));
    // if (coin && coin.uuid === this.props.match.params.uuid) {
    //   this.setState({
    //     coin: coin,
    //   });
    // }

    // this.setState(
    //   {
    //     uuid: this.props.match.params.uuid,
    //   },
    //   () => {
    //     Promise.resolve()
    //       .then(() => {
    //         this.coinApiCallerFunction();
    //         this.marketApiCallerFunction();
    //       })
    //       .then((result) => this.apiCaller())
    //       .catch((err) => {
    //         if (err.response?.status === ERROR_CODES.UNPROCESSABLE_ENTITY) {
    //           this.setState({
    //             error: err.response.data.message,
    //           });
    //         } else {
    //           this.setState({
    //             error: err.message,
    //           });
    //         }
    //       });
    //   }
    // );
  }

  // errorDisplayTimerId = null;

  componentDidUpdate(prevProps) {
    if (prevProps.selectedCurrency.uuid !== this.props.selectedCurrency.uuid) {
      clearInterval(this.fetchSingleCoinTimerId);
      let coinUuid = this.props.selectedCoin.uuid;
      if (coinUuid === undefined || coinUuid === null) {
        let path = window.location.pathname;
        coinUuid = path.substr(6);
      }
      this.fetchSingleCoinTimerId = setInterval(
        this.props.fetchSingleCoin,
        REFRESH_TIMES.API_REFETCH_TIME,
        coinUuid
      );
    }
    // if (this.state.error.length > 0) {
    //   setTimeout(() => {
    //     this.setState({
    //       error: "",
    //     });
    //   }, 5000);
    // }
  }

  componentWillUnmount() {
    if (this.fetchSingleCoinTimerId) {
      clearInterval(this.fetchSingleCoinTimerId);
      this.fetchSingleCoinTimerId = null;
    }
    // if (this.marketApiCallTimerId) {
    //   clearInterval(this.marketApiCallTimerId);
    //   this.marketApiCallTimerId = null;
    // }
    // if (this.errorDisplayTimerId) {
    //   clearTimeout(this.errorDisplayTimerId);
    //   this.errorDisplayTimerId = null;
    // }
  }

  // shouldComponentUpdate(nextProps, newState) {
  //   if (
  //     JSON.stringify(this.props.selectedCurrency) !==
  //     JSON.stringify(nextProps.selectedCurrency)
  //   ) {
  //     if (this.coinApiCallTimerId) {
  //       clearInterval(this.coinApiCallTimerId);
  //       this.coinApiCallTimerId = null;
  //     }
  //     if (this.marketApiCallTimerId) {
  //       clearInterval(this.marketApiCallTimerId);
  //       this.marketApiCallTimerId = null;
  //     }
  //     Promise.resolve()
  //       .then(() => {
  //         this.coinApiCallerFunction();
  //         this.marketApiCallerFunction();
  //       })
  //       .then((result) => this.apiCaller())
  //       .then((result) => true)
  //       .catch((err) => {
  //         if (err.response?.status === ERROR_CODES.UNPROCESSABLE_ENTITY) {
  //           this.setState({
  //             error: err.response.data.message,
  //           });
  //         } else {
  //           this.setState({
  //             error: err.message,
  //           });
  //         }
  //       });
  //   }
  //   if (JSON.stringify(newState.coin) !== JSON.stringify(this.props.coin)) {
  //     return true;
  //   }
  //   if (
  //     JSON.stringify(newState.markets) !== JSON.stringify(this.state.markets)
  //   ) {
  //     return true;
  //   }
  //   if (JSON.stringify(newState.error) !== JSON.stringify(this.state.error)) {
  //     return true;
  //   }
  //   if (JSON.stringify(newState.uuid) !== JSON.stringify(this.state.uuid)) {
  //     return true;
  //   }

  //   return false;
  // }

  coinPageDivRef = React.createRef();

  whenCoinPageDivLoaded = () => {
    this.coinPageDivRef.current.classList.add(
      "coinPageDivRemoveOpaque101CoinPage"
    );
  };

  linkStyle = {
    color: "#E0E4ED",
    textDecoration: "none",
    fontWeight: 900,
  };

  headingStyle = {};

  priceChangeStyles = () => {
    const change = Number.parseFloat(this.props.coin.change);
    let result = {};
    if (change > 0) {
      result = {
        color: "rgb(0, 255, 0)",
      };
    } else if (change < 0) {
      result = {
        color: "rgb(235, 29, 29)",
      };
    } else {
      result = {
        color: "rgb(206, 206, 206)",
      };
    }
    return result;
  };

  getPricesForSparkline = () => {
    const val = this.props.coin.sparkline;
    return val.map((value) => {
      return Number(value);
    });
  };

  getPriceChange = () => {
    const increase = this.props.coin.change > 0 ? 1 : 0;
    if (increase === 1) {
      return `+${formatNumber(this.props.coin.change, 2)}%`;
    }
    return `${formatNumber(this.props.coin.change, 2)}%`;
  };

  getFinalRender = () => {
    const coin = this.props.coin;
    const coinDataRecieved = coin.uuid;
    console.log(coinDataRecieved);
    return coinDataRecieved ? (
      <div className="parentContainer101CoinPage">
        <Error error={this.state.error} />
        <LanguageSelector />
        <div className="coinPageContainer101CoinPage">
          <div
            ref={this.coinPageDivRef}
            className="coinPageDiv101CoinPage coinPageDivOpaque101CoinPage"
            onLoad={this.whenCoinPageDivLoaded}
          >
            <div className="nameAndPriceDiv101CoinPage">
              <div className="coinIconAndName101CoinPage">
                <a
                  target={this.props.coin.websiteUrl ? "_blank" : "_self"}
                  rel="noreferrer"
                  href={`${
                    this.props.coin.websiteUrl ? this.props.coin.websiteUrl : ""
                  }`}
                  style={this.linkStyle}
                >
                  <div>
                    <img
                      src={this.props.coin.iconUrl}
                      className="cryptoIcon101CoinPage"
                      alt="crypto-icon"
                    />
                  </div>
                  <div className="nameHeading101CoinPage">
                    {this.props.coin.name}({this.props.coin.symbol})
                  </div>
                </a>
              </div>
              <div className="coinPrices101CoinPage">
                <HeadingH2
                  className="heading101CoinPage"
                  text="Price"
                  color={this.props.coin.color}
                />
                <div className="coinPricesChild101CoinPage">
                  <div>
                    <img
                      src={this.props.selectedCurrency.iconUrl}
                      className="priceIcon101CoinPage"
                      alt="SYM"
                    />
                    <div>{formatNumber(this.props.coin.price, 6)}</div>
                  </div>
                  <div>
                    <span
                      className="priceChange101CoinPage"
                      style={this.priceChangeStyles()}
                    >
                      ({this.getPriceChange()})
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="coinDetails101CoinPage">
              <div>
                <HeadingH2
                  className="heading101CoinPage"
                  text="Rank"
                  color={this.props.coin.color}
                />
                <div className="coinInfo101CoinPage">
                  {this.props.coin.rank}
                </div>
              </div>
              <div>
                <HeadingH2
                  className="heading101CoinPage"
                  text="Supply"
                  color={this.props.coin.color}
                />
                <div className="coinInfo101CoinPage">
                  {formatNumber(this.props.coin?.supply?.total)}
                </div>
              </div>
              <div>
                <HeadingH2
                  className="heading101CoinPage"
                  text="All Time High"
                  color={this.props.coin.color}
                />
                <div className="coinInfo101CoinPage">
                  <img
                    src={this.props.selectedCurrency.iconUrl}
                    className="priceIcon101CoinPage"
                    alt="SYM"
                  />
                  <span>
                    {formatNumber(this.props.coin.allTimeHigh?.price, 6)}
                  </span>
                </div>
              </div>
            </div>
            <div className="description101CoinPage">
              <HeadingH1 text="About" color={this.props.coin.color} />
              <div
                dangerouslySetInnerHTML={{
                  __html: `${
                    this.props.coin.description || "No Description Available"
                  }`,
                }}
              ></div>
            </div>
            <div className="sparkLine101CoinPage">
              <HeadingH1 text="Chart (1D)" color={this.props.coin.color} />
              <div>
                <SparkLine
                  data={this.getPricesForSparkline()}
                  height={200}
                  width={600}
                  animate
                  animationDuration={2000}
                  color={this.props.coin.color ? this.props.coin.color : "aqua"}
                  includeZero={false}
                  areaOpacity={0.7}
                  areaColor={[
                    this.props.coin.color ? this.props.coin.color : "aqua",
                    "white",
                  ]}
                />
              </div>
            </div>
            <div className="market101CoinPage">
              <HeadingH1 text="Market" color={this.props.coin.color} />
              {/* <MarketTable
                markets={this.state.markets}
                currency={this.props.selectedCurrency}
                whenHeadingIsClicked={this.whenHeadingIsClicked}
              /> */}
            </div>
            <div className="visitLinks101CoinPage">
              <HeadingH1 text="Links" color={this.props.coin.color} />
              <AllLinks links={this.props.coin.links} />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <Error error={this.state.error} />
        <Loader coin={this.props.selectedCoin} />
      </div>
    );
  };

  render() {
    return this.getFinalRender();
  }
}

const mapStateToProps = (state) => {
  return {
    coin: state.coin,
    selectedCurrency: state.selectedCurrency,
  };
};

export default connect(mapStateToProps, { fetchSingleCoin })(CoinPage);
