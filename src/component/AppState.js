import React from 'react';
import HomePage from "./presentation/HomePage";

class AppState extends React.Component {

    constructor(props) {
        super(props);
        this.setValue = this.setValue.bind(this);
        this.setRegistration = this.setRegistration.bind(this);
        this.setLogin = this.setLogin.bind(this);
        this.setSessionToken = this.setSessionToken.bind(this);
        this.state = {
            setValue: this.setValue,
            setRegistration: this.setRegistration,
            setLogin: this.setLogin,
            setSessionToken: this.setSessionToken,
            registration: "",
            login: "",
            sessionToken: ""
        }
    }

    setValue(value) {
        this.setState({response: value});
    }

    setRegistration(value) {
        this.setState({registration: value});
    }

    setLogin(value) {
        this.setState({login: value});
    }

    setSessionToken(value) {
        this.setState({sessionToken: value});
    }

    render() {
        console.log("appstate", this.state)
        return (
            <HomePage state={this.state}/>
        );
    }
}

export default AppState;