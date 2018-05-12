import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React from "react";
import BlockView from "./component/BlockView";
import HomePage from "./component/presentation/HomePage";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.setValue = this.setValue.bind(this);
        this.setLogin = this.setLogin.bind(this);
        this.setSessionToken = this.setSessionToken.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setBlocks = this.setBlocks.bind(this);
        this.setContracts = this.setContracts.bind(this);
        this.setView = this.setView.bind(this);
        this.state = {
            setValue: this.setValue,
            setLogin: this.setLogin,
            setSessionToken: this.setSessionToken,
            setEmail: this.setEmail,
            setBlocks: this.setBlocks,
            setContracts: this.setContracts,
            setView: this.setView,
            login: "",
            sessionToken: localStorage.getItem('sessionToken') || "",
            email: localStorage.getItem('email') || "",
            blocks: "",
            contracts: "",
            createView: "contract"
        }
    }

    setView(value) {
        this.setState({createView: value})
    }

    setValue(value) {
        this.setState({response: value});
    }

    setEmail(value) {
        this.setState({email: value});
        localStorage.setItem('email', value);
    }

    setLogin(value) {
        if (value.activation) {
            this.setState({login: value});
        } else {
            this.setState({sessionToken: value.sessionToken});
            localStorage.setItem('sessionToken', value.sessionToken);
        }
    }

    setSessionToken(value) {
        this.setState({sessionToken: value.sessionToken});
        localStorage.setItem('sessionToken', value.sessionToken);
    }

    setBlocks(value) {
        this.setState({blocks: value.BLOCKCHAIN});
    }

    setContracts(value) {
        this.setState({contracts: value.contracts});
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route render={(routeProps) => (<HomePage state={this.state} {...routeProps}/>)} exact
                               path="/"/>
                        <Route render={(routeProps) => (<BlockView state={this.state} {...routeProps}/>)}
                               path="/block/:blockDepth"/>
                    </Switch>
                </div>
            </Router>
        );
    }

}

export default App;
