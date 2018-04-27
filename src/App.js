import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import React from "react";
import HomePage from "./component/HomePage";

class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route component={HomePage} exact path="/"/>
                    </Switch>
                </div>
            </Router>
        );
    }

}

export default App;
