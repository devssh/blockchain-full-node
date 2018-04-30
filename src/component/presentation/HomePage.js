import React from 'react';
import {Consumer} from "../AppState";
import {Col, Grid, Row} from "react-bootstrap";
import RegisterForm from "../RegisterForm";
import LoginForm from "../LoginForm";

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
                                <LoginForm />

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