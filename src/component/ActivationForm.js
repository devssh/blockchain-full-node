import React from 'react';
import {Col, Grid, Row} from "react-bootstrap";
import {request} from './reducer/request';

class ActivationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            activationCode: ""
        };

        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.activate = this.activate.bind(this);
    }

    activate(event) {
        request('post', '/complete-registration', {
            email: this.state.email,
            activationCode: this.state.activationCode
        }, this.props.state.setSessionToken);
        this.props.state.setEmail(this.state.email);
        this.refs.loginEmail.value = "";
        this.refs.loginPassword.value = "";
        event.stopPropagation();
        event.preventDefault();
    };

    updateEmail(event) {
        if (event.key === "Enter") {
            this.activate();
            event.preventDefault();
        }
        this.setState({email: event.target.value + "@gmail.com"});
    }

    updatePassword(event) {
        if (event.key === "Enter") {
            this.activate();
            event.preventDefault();
        }
        this.setState({activationCode: event.target.value.toString()});
    }

    render() {
        return (
            <form className={"login clearfix form"}>
                <Grid>
                    <Row className={"email"}>
                        <Col md={3} className={"email-label"}>
                            Email
                        </Col>
                        <Col md={9}>
                            <input type="text" ref={"loginEmail"} onChange={this.updateEmail} placeholder={"jane.doe"}/> @gmail.com
                        </Col>
                    </Row>
                    <Row className={"password"}>
                        <Col md={3}>
                            Password
                        </Col>
                        <Col md={9}>
                            <input type="text" ref={"loginPassword"} onChange={this.updatePassword}
                                   placeholder={"**********"}/>
                        </Col>
                    </Row>
                    <Row className={"login-button"}>
                        <Col md={3}></Col>
                        <Col md={6}>
                            <input type="button" value="Activate account" onClick={this.activate}/>
                        </Col>
                    </Row>
                </Grid>

            </form>
        );
    }
}

export default ActivationForm;