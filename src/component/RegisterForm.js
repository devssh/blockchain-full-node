import React from 'react';
import {Col, Grid, Row} from "react-bootstrap";
import CryptoJS from 'crypto-js';
import {request} from './reducer/request';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };

        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.register = this.register.bind(this);
    }

    register(event) {
        request('post', '/register', {
            email: this.state.email,
            password: this.state.password
        }, this.props.state.setRegistration);
        this.setState({password: ""});
        this.refs.registerEmail.value = "";
        this.refs.registerPassword.value = "";
        event.stopPropagation();
        event.preventDefault();
    };

    updateEmail(event) {
        if (event.key === "Enter") {
            this.register();
            event.preventDefault();
        }
        this.setState({email: event.target.value + "@gmail.com"});
    }

    updatePassword(event) {
        if (event.key === "Enter") {
            this.register();
            event.preventDefault();
        }
        this.setState({password: CryptoJS.SHA3(event.target.value).toString(CryptoJS.enc.base64)});

    }

    render() {
        return (
            <form className={"register clearfix form"}>
                <Col md={12}>
                    <Row className={"email"}>
                        <Col md={3} className={"email-label"}>
                            Email
                        </Col>
                        <Col md={9}>
                            <input className="email-txt" type="text" ref={"registerEmail"} onChange={this.updateEmail}
                                    placeholder={"john.doe"}/> @gmail.com
                        </Col>
                    </Row>
                    <Row className={"password"}>
                        <Col md={3}>
                            Password
                        </Col>
                        <Col md={9}>
                            <input type="password" ref={"registerPassword"} onChange={this.updatePassword}
                                    placeholder={"**********"}/>
                        </Col>
                    </Row>
                    <Row className={"register-button"}>
                        <Col md={3}></Col>
                        <Col md={6}>
                            <input type="button" className="btn btn-primary" value="Register" onClick={this.register}/>
                        </Col>
                    </Row>
                </Col>
            </form>
        );
    }
}

export default RegisterForm;