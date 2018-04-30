import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import React from "react";
import AppState from "./component/AppState";

class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route component={AppState} exact path="/"/>
                    </Switch>
                </div>
            </Router>
        );
    }

}

export default App;
