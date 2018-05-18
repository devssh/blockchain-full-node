import React from 'react';
import {Col, Grid, Row} from "react-bootstrap";
import CryptoJS from 'crypto-js';
import {request} from './reducer/request';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };

        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.login = this.login.bind(this);
    }

    login(event) {
        request('post', '/login', {
            email: this.state.email,
            password: this.state.password
        }, this.props.state.setLogin);
        this.props.state.setEmail(this.state.email);
        this.setState({password: ""});
        this.refs.loginEmail.value = "";
        this.refs.loginPassword.value = "";
        event.stopPropagation();
        event.preventDefault();
    };

    updateEmail(event) {
        if (event.key === "Enter") {
            // this.login(event);
            event.preventDefault();
        }
        this.setState({email: event.target.value + "@gmail.com"});
    }

    updatePassword(event) {
        if (event.key === "Enter") {
            this.login(event);
            event.preventDefault();
        }
        this.setState({password: CryptoJS.SHA3(event.target.value).toString()});
    }

    render() {
        return (
            <form className={"login clearfix form"}>
            <Col md={12}>
                    <Row className={"email"}>
                        <Col md={3} className={"email-label"}>
                            Email
                        </Col>
                        <Col md={9}>
                            <input type="text" className="email-txt" ref={"loginEmail"} onKeyUp={this.updateEmail} placeholder={"jane.doe"} autoFocus/> @gmail.com
                        </Col>
                    </Row>
                    <Row className={"password"}>
                        <Col md={3}>
                            Password
                        </Col>
                        <Col md={9}>
                            <input type="password" ref={"loginPassword"} onKeyUp={this.updatePassword}
                                   placeholder={"**********"}/>
                        </Col>
                    </Row>
                    <Row className={"login-button"}>
                        <Col md={3}></Col>
                        <Col md={6}>
                            <input type="button" className="btn btn-primary" value="Login" onClick={this.login}/>
                        </Col>
                    </Row>
            </Col>
            </form>
        );
    }
}

export default LoginForm;