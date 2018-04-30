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
                            <input type="text" ref={"loginPassword"} onChange={this.updatePassword}
                                   placeholder={"**********"}/>
                        </Col>
                    </Row>
                    <Row className={"login-button"}>
                        <input type="button" value="Activate account" onClick={this.activate}/>
                    </Row>
                </Grid>

            </form>
        );
    }
}

export default ActivationForm;