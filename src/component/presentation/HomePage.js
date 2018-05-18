import React from 'react';
import {Col, Grid, Row} from "react-bootstrap";
import RegisterForm from "../RegisterForm";
import LoginForm from "../LoginForm";
import ActivationForm from "../ActivationForm";
import CreateFlow from "../CreateFlow";
import RedeemFlow from '../RedeemFlow';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout() {
        this.props.state.setEmail("");
        this.props.state.setSessionToken({sessionToken: ""});
        this.props.state.setLogin({activation: ""});
    }
    render() {
        let props = this.props;
        return (
            <div>
                <div className="header">
                    Blockchain Full Node
                    {
                        props.state.sessionToken && props.state.sessionToken !== "undefined" && <div className="logout-panel">
                            <div className="logout" onClick={this.logout} title={"Logout " + props.state.email}>
                                <i className="fa fa-power-off" aria-hidden="true"></i><br/>
                                <span className="small-text">{props.state.email}</span>
                            </div>
                        </div>
                    }
                </div>
                <Grid>
                    {props.state.sessionToken && props.state.sessionToken !== "undefined" ? (
                        props.state.role === "redeem" ? 
                        <RedeemFlow {...props} /> : 
                            props.state.role === "full" ? 
                                <div>
                                <CreateFlow {...props} />     
                                <RedeemFlow {...props} />
                                </div>
                             : <CreateFlow {...props} />
                        
                    ) : (
                        <Row className="body">
                                {props.state.login.activation && props.state.login.activation !== "" ? (
                                    <div className="toggle-btn">
                                        <label htmlFor="toggle" className="btn1 btn btn-grey">Login</label>
                                        <div className="content1 toggle-content">
                                            <ActivationForm {...props}/>
                                        </div>
                                    </div>
                                    
                                ) : (
                                    <div className="toggle-btn">
                                        <input type="checkbox" id="toggle"/>
                                        <label htmlFor="toggle" className="btn1 btn btn-grey">Login</label>
                                        <label htmlFor="toggle" className="btn2 btn btn-grey">Register</label>
                                        <div className="content1 toggle-content">
                                            <LoginForm {...props}/>
                                        </div>
                                        <div className="content2 toggle-content">
                                            <RegisterForm {...props}/>
                                        </div>
                                    </div>
                                )}
                        </Row>
                    )}
                </Grid>
            </div>
        );
    }
}


export default HomePage;