import React from 'react';
import {Col, Grid, Row} from "react-bootstrap";
import CryptoJS from 'crypto-js';
import {request} from './reducer/request';

class RegisterForm extends React.Component {
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
        });
        this.setState({email: ""});
        this.setState({password: ""});
        this.refs.loginEmail.value = "";
        this.refs.loginPassword.value = "";
        event.stopPropagation();
        event.preventDefault();
    };

    updateEmail(event) {
        if (event.key === "Enter") {
            this.login();
            event.preventDefault();
        }
        this.setState({email: event.target.value + "@gmail.com"});
    }

    updatePassword(event) {
        if (event.key === "Enter") {
            this.login();
            event.preventDefault();
        }
        this.setState({password: CryptoJS.SHA3(event.target.value).toString()});
    }

    render() {
        return (
            <form className={"login"}>
                <Grid>
                    <Row className={"email"}>
                        <Col md={1} className={"email-label"}>
                            Email
                        </Col>
                        <Col md={3}>
                            <input type="text" ref={"loginEmail"} onChange={this.updateEmail} placeholder={"jane.doe"}/>
                        </Col>
                        <Col md={1} className={"email-suffix"}>
                            @gmail.com
                        </Col>
                    </Row>
                    <Row className={"password"}>
                        <Col md={1}>
                            Password
                        </Col>
                        <Col md={4}>
                            <input type="password" ref={"loginPassword"} onChange={this.updatePassword} placeholder={"**********"}/>
                        </Col>
                    </Row>
                    <Row className={"login-button"}>
                        <input type="button" value="Login" onClick={this.login}/>
                    </Row>
                </Grid>

            </form>
        );
    }
}

export default RegisterForm;