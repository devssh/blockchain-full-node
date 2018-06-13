import React from 'react';
import {request} from './reducer/request';
import SubmitButton from "./SubmitButton";
import TextField from "./TextField";
import Display from "./Display";

import failure from "../images/failure.png";
import success from "../images/success.png";
import error from "../images/error.png";

import TransactionStatus from "./TransactionStatus";
import QrReader from 'react-qr-reader'
import {get_discount} from "./utils/DiscountUtil";

class CompleteTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            field1: "",
            field2: "",
            field3: "",
            field4: "",
            field5: "",
            transactionStateJSX: ""
        };

        this.updateName = this.updateName.bind(this);
        this.createTransaction = this.createTransaction.bind(this);
        this.handleScan = this.handleScan.bind(this)
    }

    handleScan(data) {
        if (data) {
            let scan = data.split(",");
            this.setState({
                name: scan[0],
                field1: scan[1], //product name
                field2: scan[2], // discount
                field5: scan[3], //type
                field3: scan[4], //email
                field4: scan[5] //scan
            }, () => {
                this.createTransaction();
            });
        }
    }

    handleError(err) {
        console.error(err)
    }

    createTransaction() {
        let {name, field1, field2, field3, field5, field4} = this.state;
        if (name.trim().length > 0) {
            request('post', '/completeTransaction', {
                name: name,
                fields: [field1, field2, field3, field5, field4],
                email: this.props.state.email,
                sessionToken: this.props.state.sessionToken
            }, (data) => {
                let transactionStateJSX = "";
                if (data.complete === true) {
                    transactionStateJSX =
                        <TransactionStatus className="success" imgsrc={success} label="Coupon is approved"/>;
                } else if (data.complete === false) {
                    transactionStateJSX = <TransactionStatus className="failure" imgsrc={failure}
                                                             label="Coupon has expired"/>;
                } else if (data.complete.toLowerCase() === "doublespenddetected") {
                    transactionStateJSX =
                        <TransactionStatus className="error" imgsrc={error}
                                           label="Something went wrong. Please try again later."/>;
                }
                this.setState({transactionStateJSX})
            });
        }
    };

    updateName(event) {
        if (event.key === "Enter") {
            this.createTransaction();
        } else {
            let scan = event.target.value.split(',');
            this.setState({
                name: scan[0],
                field1: scan[1],
                field2: scan[2],
                field5: scan[3],
                field3: scan[4],
                field4: scan[5]
            }, ()=>{
                this.createTransaction();
            });
        }
    }

    render() {
        return (
            <div className="complete-transaction-form-view" ref={"completeTransactionForm"}>
                <div className="redeem-wrapper">
                        <div className="redeem-icon"></div>
                        <p className="redeem-title"> Scan Coupon </p>

                    <div className="qr-wrapper">
                        {<QrReader
                            delay={this.state.delay}
                            onError={this.handleError}
                            onScan={this.handleScan}
                            className="qr-reader"
                        />}
                        {this.state.transactionStateJSX !== "" && this.state.transactionStateJSX}
                        {/*<div className="transaction-status">*/}
                        {/*<div className="error">*/}
                        {/*<img src={error}/>*/}
                        {/*<div className="status-label"><span>Coupon is approved!</span></div>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                    </div>

                    <TextField label={"Scan"} type="password" placeholder={"Scan information goes here..."}
                               onKeyUp={this.updateName}
                               removeActive={false} autofocus={true}/>
                    <div className="button-container">
                        <SubmitButton className={"btn btn-primary btn-redeem-coupon"} value={"Redeem Coupon"}
                                      onClick={this.createTransaction}/>
                    </div>
                    <div>
                        <Display value={this.state.name} label={"Name"}/>
                        <Display value={this.state.field1} label={"Product"}/>
                        <Display value={get_discount(this.state.field5,this.state.field2)} label={"Discount"}/>
                        <Display value={this.state.field3} label={"Email"}/>
                        <Display value={this.state.field4} label={"Code"}/>
                    </div>
                </div>


            </div>

        );
    }
}

export default CompleteTransaction;