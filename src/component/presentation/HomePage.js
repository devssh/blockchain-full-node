import React from 'react';
import {Col, Grid, Row} from "react-bootstrap";
import RegisterForm from "../RegisterForm";
import LoginForm from "../LoginForm";
import ActivationForm from "../ActivationForm";
import BlockExplorer from "../BlockExplorer";

const HomePage = (props) => {
    return (
        <div>
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
                {props.state.sessionToken && props.state.sessionToken !== "undefined" ? (
                    <BlockExplorer {...props}/>
                ) : (
                    <Row className={"row body"}>
                        <Col md={3}>
                        </Col>
                        <Col md={6}>
                            {props.state.login.activation ? (
                                <ActivationForm {...props}/>
                            ) : (
                                <div>
                                    <LoginForm {...props}/>

                                    <br/>

                                    <RegisterForm {...props}/>

                                    <br/>
                                </div>
                            )}


                        </Col>
                        <Col md={3}>
                        </Col>
                    </Row>
                )}
            </Grid>
        </div>
    );
};

export default HomePage;