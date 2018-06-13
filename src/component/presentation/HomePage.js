import React from 'react';
import {Col, Grid, Row} from "react-bootstrap";
import RegisterForm from "../RegisterForm";
import LoginForm from "../LoginForm";
import ActivationForm from "../ActivationForm";
import CreateFlow from "../CreateFlow";
import RedeemFlow from '../RedeemFlow';
import blockchain_image from "../../assets/main-background.png";
import redeem_btn_icon from "../../assets/redeem-btn.svg";
import redeem_btn_selected from "../../assets/redeem-btn-selected.svg";
import Scrollspy from 'react-scrollspy';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.showHomeTab = this.showHomeTab.bind(this);
        this.showRedeemTab = this.showRedeemTab.bind(this);
        this.state = {
            isNavInPosition: false,
            shouldShowRedeem: false
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const nav = document.querySelector('.navigation-bar'),
            pageScrollHeight = document.documentElement.scrollTop;
        const offsetTop = nav ? nav.offsetTop : 0;
        this.setState({isNavInPosition: offsetTop < pageScrollHeight})
    }

    logout() {
        this.props.state.setEmail("");
        this.props.state.setSessionToken({sessionToken: ""});
        this.props.state.setLogin({activation: ""});
    }

    showHomeTab() {
        this.setState({shouldShowRedeem: false});
    }

    showRedeemTab() {
        this.setState({shouldShowRedeem: true});
    }

    renderHeader(props) {
        return (<div>
            <div className="header">
                <p className="blockchain-full-node">Blockchain Full Node </p>
                {
                    this.state.shouldShowRedeem ?
                        <div className="redeem-button cursor-none"><img className="redeem-icon cursor-none" src={redeem_btn_selected}></img>
                        </div>
                        :
                        <div className="redeem-button" onClick={this.showRedeemTab}>
                            <img className="redeem-icon" src={redeem_btn_icon}></img>
                        </div>
                }
            </div>
            <div className="divider">
                <p className='divider-line'></p>
            </div>
            <div className={`navigation-bar ${this.state.isNavInPosition ? 'fixed-nav' : ''}`}>
                <Scrollspy items={ ['section-1', 'section-2', 'section-3'] } currentClassName="is-current">
                    <a className="nav-item" href="#section-1" onClick={this.showHomeTab}>Home</a>
                    <a className="nav-item" href="#section-2" onclick={this.showHomeTab}>Block Explorer</a>
                    <a className="nav-item" href="#section-3" onClick={this.showHomeTab}>Transactions</a>
                    <a className={`nav-item ${this.state.shouldShowRedeem ? 'is-current' : ''}`}
                       onClick={this.showRedeemTab}>Redeem</a>
                    {
                        props.state.sessionToken && props.state.sessionToken !== "undefined" &&
                        <div className="logout-panel">
                            <div className="logout" onClick={this.logout} title={"Logout " + props.state.email}>
                                <i className="fa fa-power-off logout-icon" aria-hidden="true"></i>
                                <span className="small-text">{props.state.email}</span>
                            </div>
                        </div>
                    }
                </Scrollspy>
            </div>
        </div>)
    }

    render() {
        let props = this.props;
        return (
            <div className="grid-cont">
                {props.state.sessionToken && props.state.sessionToken !== "undefined" ? (
                    props.state.role === "redeem" ?
                        <div>{this.renderHeader(props)}<RedeemFlow {...props} />
                            <div className="footer"/>
                        </div> :
                        props.state.role === "full" ?
                            <div>
                                {this.renderHeader(props)}
                                {this.state.shouldShowRedeem ? <RedeemFlow {...props} /> : <CreateFlow {...props} />}
                                <div className="footer"/>
                            </div>
                            : <div> {this.renderHeader(props)} <CreateFlow {...props} />
                            <div className="footer"/>
                        </div>

                ) : (
                    <Row className="body login-page">
                        {props.state.login.activation && props.state.login.activation !== "" ? (
                            <div className="toggle-btn">
                                <input type="checkbox" id="toggle"/>
                                <label htmlFor="toggle" className="btn1 btn btn-grey">Activate</label>

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
            </div>
        );
    }
}


export default HomePage;