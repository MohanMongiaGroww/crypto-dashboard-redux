import React from 'react';

import SearchBar from "../../ui/SearchBar";
import Table from "../../ui/Table";

import {getAllCoins} from "../../utils/api";
import {ERROR_CODES} from "../../utils/constants";

class HomePage extends React.PureComponent {
    
    state={
        coins:[],
        error: ""
    }

    apiCallTimerId = null;

    apiCallerFunction = () => {
        getAllCoins()
        .then(result => {
            if(result.status === ERROR_CODES.SUCCESS)
            {
                const coins = result.data.data.coins;
                const copyCoins = [...coins];
                if(this.sortedField.length !== 0)
                {
                    this.sortingBool[this.sortedField] = !this.sortingBool[this.sortedField];
                    this.doSorting(coins,this.sortedField);
                    this.sortingBool[this.sortedField] = !this.sortingBool[this.sortedField];
                }
                this.setState({
                    coins : coins
                },() => {
                    localStorage.setItem("Coins",JSON.stringify(copyCoins));
                });
            }
        })
        .catch(err => {
            console.log(err)
            if(err.response.status === ERROR_CODES.UNPROCESSABLE_ENTITY)
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

    sortingBool = {
        "price" : true,
        "name" : true,
        "marketCap" : true,
        "btcPrice" : true
    }

    sortedField = "";

    doSorting = (sortedCoins,field) => {
        sortedCoins.sort((coinA,coinB) => {
            const ascending = this.sortingBool[field];
            if(field !=="name")
                return ascending ? coinB[field] - coinA[field] : coinA[field] - coinB[field];
            else
            {
                return ascending ? (coinA[field] > coinB[field] ? 1 : -1) : (coinA[field] < coinB[field] ? 1 : -1)
            }
        });

    }

    whenHeadingIsClicked = (field) => {
        const sortedCoins = [...this.state.coins];
        this.sortedField = field;

        this.doSorting(sortedCoins,field);
        
        this.sortingBool[field] = !this.sortingBool[field];

        this.setState({
            coins : [...sortedCoins]
        });
    }

    componentDidMount() {
        const Coins =  JSON.parse(localStorage.getItem("Coins"));
        if(Coins)
        {
            this.setState({
                coins:Coins
            });
        }

        Promise.resolve()
            .then(() => {
                this.apiCallerFunction();
            })
            .then(result => this.apiCaller())
            .catch(err => {
                console.log(err);
            })
    }

    componentWillUnmount() {
        if(this.apiCallTimerId)
        {
            clearInterval(this.apiCallTimerId);
            this.apiCallTimerId = null;
        }
    }

    getFinalRender = () => {
        const isError = this.state.error.length > 0;

        if(!isError)
        {
            return (
                <div>
                    <SearchBar />
                    <Table coins={this.state.coins} whenHeadingIsClicked={this.whenHeadingIsClicked} />
                </div>
            )
        }
        return (
            <div className="Error">
                {this.state.error}
            </div>
        )
    }
  
    render() {
        return (
            this.getFinalRender()
        )
    }
}

export default HomePage;
