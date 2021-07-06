import React from "react";
import { connect } from "react-redux";

import SearchBarHolder from "../../ui/SearchBar/SearchBarHolder";
import LanguageSelector from "../../ui/LanguageSelector/LanguageSelector";
import Table from "../../ui/Table/CoinTable/Table";
import Error from "../../ui/Error/Error";

import { getAllCoins } from "../../utils/api";
import { ERROR_CODES, REFRESH_TIMES } from "../../utils/constants";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/helpers";

import { fetchCoins } from "../../store/actionCreators";

import "./homePage.css";

class HomePage extends React.Component {
  state = {
    error: "",
  };

  // sortingBool = {
  //   price: true,
  //   name: true,
  //   marketCap: true,
  //   btcPrice: true,
  // };

  // sortedField = "";

  // apiCallTimerId = null;

  // apiCallerFunction = () => {
  //   getAllCoins(this.props.selectedCurrency.uuid)
  //     .then((result) => {
  //       if (result.status === ERROR_CODES.SUCCESS) {
  //         const coins = result.data.data.coins;
  //         const copyCoins = [...coins];
  //         if (this.sortedField.length !== 0) {
  //           this.sortingBool[this.sortedField] =
  //             !this.sortingBool[this.sortedField];
  //           this.doSorting(coins, this.sortedField);
  //           this.sortingBool[this.sortedField] =
  //             !this.sortingBool[this.sortedField];
  //         }
  //         this.setState(
  //           {
  //             coins: coins,
  //           },
  //           () => {
  //             setLocalStorageItem("Coins", copyCoins);
  //           }
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.response?.status === ERROR_CODES.UNPROCESSABLE_ENTITY) {
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
  //   this.apiCallTimerId = setInterval(
  //     this.apiCallerFunction,
  //     REFRESH_TIMES.API_REFETCH_TIME
  //   );
  // };

  // doSorting = (sortedCoins, field) => {
  //   sortedCoins.sort((coinA, coinB) => {
  //     const ascending = this.sortingBool[field];
  //     if (field !== "name")
  //       return ascending
  //         ? coinB[field] - coinA[field]
  //         : coinA[field] - coinB[field];
  //     else {
  //       return ascending
  //         ? coinA[field] > coinB[field]
  //           ? 1
  //           : -1
  //         : coinA[field] < coinB[field]
  //         ? 1
  //         : -1;
  //     }
  //   });
  // };

  // whenHeadingIsClicked = (field) => {
  //   const sortedCoins = [...this.props.coins];
  //   this.sortedField = field;

  //   this.doSorting(sortedCoins, field);

  //   this.sortingBool[field] = !this.sortingBool[field];

  //   this.setState({
  //     coins: [...sortedCoins],
  //   });
  // };

  componentDidMount() {
    this.props.fetchCoins();
    // const Coins = getLocalStorageItem("Coins");
    // if (Coins) {
    //   this.setState({
    //     coins: Coins,
    //   });
    // }
    // Promise.resolve()
    //   .then(() => {
    //     this.apiCallerFunction();
    //   })
    //   .then((result) => {
    //     this.apiCaller();
    //   })
    //   .catch((err) => {
    //     if (err.response?.status === ERROR_CODES.UNPROCESSABLE_ENTITY) {
    //       this.setState({
    //         error: err.response.data.message,
    //       });
    //     } else {
    //       this.setState({
    //         error: err.message,
    //       });
    //     }
    //   });
  }

  // shouldComponentUpdate(newProps, newState) {
  //   if (
  //     JSON.stringify(newProps.selectedCurrency) !==
  //     JSON.stringify(this.props.selectedCurrency)
  //   ) {
  //     if (this.apiCallTimerId) {
  //       clearInterval(this.apiCallTimerId);
  //       this.apiCallTimerId = null;
  //     }
  //     Promise.resolve()
  //       .then(() => {
  //         this.apiCallerFunction();
  //       })
  //       .then((result) => this.apiCaller())
  //       .then((result) => true)
  //       .catch((err) => {
  //         if (err.response?.status === ERROR_CODES.UNPROCESSABLE_ENTITY) {
  //           this.setState({
  //             error: err.response.data.message,
  //           });
  //         } else if (err.response?.status === ERROR_CODES.COIN_NOT_FOUND) {
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
  //   if (JSON.stringify(newState.coins) !== JSON.stringify(this.props.coins)) {
  //     return true;
  //   }
  //   if (JSON.stringify(newState.error) !== JSON.stringify(this.state.error)) {
  //     return true;
  //   }

  //   return false;
  // }

  // componentDidUpdate() {
  //   if (this.state.error.length > 0) {
  //     setTimeout(() => {
  //       this.setState({
  //         error: "",
  //       });
  //     }, 5000);
  //   }
  // }

  // componentWillUnmount() {
  //   if (this.apiCallTimerId) {
  //     clearInterval(this.apiCallTimerId);
  //     this.apiCallTimerId = null;
  //   }
  // }

  getFinalRender = () => {
    return (
      <div className="div101HomePage">
        <Error error={this.state.error} />
        <LanguageSelector />
        <SearchBarHolder coins={this.props.coins} />
        <Table
          coins={this.props.coins}
          // whenHeadingIsClicked={this.whenHeadingIsClicked}
          currency={this.props.selectedCurrency}
        />
      </div>
    );
  };

  render() {
    return this.getFinalRender();
  }
}

const mapStateToProps = (state) => {
  return {
    coins: state.coins,
    selectedCurrency : state.selectedCurrency
  };
};

export default connect(mapStateToProps, { fetchCoins })(HomePage);
