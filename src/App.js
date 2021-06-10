import React, { Component } from "react";

import HomePage from "./views/HomePage/HomePage";
import CoinPage from "./views/CoinPage/CoinPage";

import {BrowserRouter as Router,Route,Switch} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/coin/:uuid" render={(props) => { 
                        return <CoinPage {...props} />
                    }} />
                    <Route path="*" render={() => {
                        return (<div>Page not found</div>)
                    }} />
                </Switch>
            </Router>
        )
    }
}

export default App;
