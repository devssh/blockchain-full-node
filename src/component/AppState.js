import React from 'react';
import HomePage from "./presentation/HomePage";

class AppState extends React.Component {

    constructor(props) {
        super(props);
        this.setValue = this.setValue.bind(this);
        this.setRegistration = this.setRegistration.bind(this);
        this.setLogin = this.setLogin.bind(this);
        this.setSessionToken = this.setSessionToken.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setBlocks = this.setBlocks.bind(this);
        this.setContracts = this.setContracts.bind(this);
        this.state = {
            setValue: this.setValue,
            setRegistration: this.setRegistration,
            setLogin: this.setLogin,
            setSessionToken: this.setSessionToken,
            setEmail: this.setEmail,
            setBlocks: this.setBlocks,
            setContracts: this.setContracts,
            registration: "",
            login: "",
            sessionToken: localStorage.getItem('sessionToken') || "",
            email: localStorage.getItem('email') || "",
            blocks: "",
            contracts: ""
        }
    }

    setValue(value) {
        this.setState({response: value});
    }

    setRegistration(value) {
        this.setState({registration: value});
    }

    setEmail(value) {
        this.setState({email: value});
        localStorage.setItem('email', value);
    }

    setLogin(value) {
        this.setState({sessionToken: value.sessionToken});
        localStorage.setItem('sessionToken', value.sessionToken);
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
            <HomePage state={this.state}/>
        );
    }
}

export default AppState;