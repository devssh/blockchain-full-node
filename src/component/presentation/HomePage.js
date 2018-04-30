import React from 'react';
import {Consumer} from "../AppState";
import {Col, Grid, Row} from "react-bootstrap";
import RegisterForm from "../RegisterForm";

const HomePage = () => {
    return (
        <div>
            <Consumer>
                {state => (
                    <Grid>
                        <Row className={"header"}>
                            <Col md={4}>
                            </Col>
                            <Col md={4} className={"header-title"}>
                                Blockchain Full Node
                            </Col>
                            <Col md={4}>
                            </Col>
                        </Row>
                        <Row className={"row body"}>
                            <Col md={3}>
                            </Col>
                            <Col md={6}>
                                <form className={"login"}>
                                    <Grid>
                                        <Row className={"email"}>
                                            <Col md={1} className={"email-label"}>
                                                Email
                                            </Col>
                                            <Col md={4}>
                                                <input type="email" name="email"/>
                                            </Col>
                                        </Row>
                                        <Row className={"password"}>
                                            <Col md={1}>
                                                Password
                                            </Col>
                                            <Col md={4}>
                                                <input type="password" name="password"/>
                                            </Col>
                                        </Row>
                                        <Row className={"login-button"}>
                                            <input type="submit" value="Login"/>
                                        </Row>
                                    </Grid>

                                </form>

                                <br/>

                                <RegisterForm />

                                <br/>


                                {/*{state.greeting}*/}
                                {/*<br/>*/}
                                {/*{state.keys.keys.Dev[0].publicKey === "oh" ? state.keysHandler('k', state.setValue) : ""}*/}
                                {/*{state.keys.keys.Dev[0].publicKey}*/}
                            </Col>
                            <Col md={3}>
                            </Col>
                        </Row>
                    </Grid>
                )}
            </Consumer>
        </div>
    );
};

export default HomePage;