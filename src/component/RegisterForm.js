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
        this.register = this.register.bind(this);
    }

    register(event) {
        request('post', '/register', {
            email: this.state.email,
            password: this.state.password
        });
        this.setState({email: ""});
        this.setState({password: ""});
        this.refs.registerEmail.value="";
        this.refs.registerPassword.value="";
        event.stopPropagation();
        event.preventDefault();
    };

    updateEmail(event) {
        if (event.key === "Enter") {
            this.register();
            event.preventDefault();
        }
        this.setState({email: event.target.value});
    }

    updatePassword(event) {
        if (event.key === "Enter") {
            this.register();
            event.preventDefault();
        }
        this.setState({password: CryptoJS.SHA3(event.target.value).toString()});
    }

    render() {
        return (
            <form className={"register"}>
                <Grid>
                    <Row className={"email"}>
                        <Col md={1} className={"email-label"}>
                            Email
                        </Col>
                        <Col md={4}>
                            <input type="email" ref={"registerEmail"} onChange={this.updateEmail}/>
                        </Col>
                    </Row>
                    <Row className={"password"}>
                        <Col md={1}>
                            Password
                        </Col>
                        <Col md={4}>
                            <input type="password" ref={"registerPassword"} onChange={this.updatePassword}/>
                        </Col>
                    </Row>
                    <Row className={"register-button"}>
                        <input type="button" value="Register" onClick={this.register}/>
                    </Row>
                </Grid>
            </form>
        );
    }
}

export default RegisterForm;