import React from 'react';
import {Grid, Col} from "react-bootstrap";
import {request} from './reducer/request';
import SubmitButton from "./SubmitButton";
import TextField from "./TextField";
import Display from "./Display";

import failure from "../images/failure.png";
import success from "../images/success.png";
import error from "../images/error.png";

import TransactionStatus from "./TransactionStatus";
import QrReader from 'react-qr-reader'


class CompleteTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            field1: "",
            field2: "",
            field3: "",
            field4: "",
            transactionStateJSX: "",
            delay: 3000
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
                field1: scan[1],
                field2: scan[2],
                field3: scan[3],
                field4: scan[4]
            }, () => {
                this.createTransaction();
            });
        }
    }

    handleError(err) {
        console.error(err)
    }

    createTransaction() {
        let {name, field1, field2, field3, field4} = this.state;
        if (name.trim().length > 0) {
            request('post', '/completeTransaction', {
                name: name,
                fields: [field1, field2, field3, field4],
                email: this.props.state.email,
                sessionToken: this.props.state.sessionToken
            }, (data) => {
                let transactionStateJSX = "";
                if (data.complete === true) {
                    transactionStateJSX =
                        <TransactionStatus className="success" imgsrc={success} label="Coupon is approved"/>;
                } else if (data.complete === false) {
                    transactionStateJSX = <TransactionStatus className="failure" imgsrc={failure}
                                                             label="Something went wrong. Please try again later."/>;
                } else if (data.complete.toLowerCase() === "doublespenddetected") {
                    transactionStateJSX =
                        <TransactionStatus className="doublespenddetected" imgsrc={error} label="Coupon has expired"/>;
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
                field3: scan[3],
                field4: scan[4]
            });
        }
    }

    render() {
        return (
            <div className={"form-view"} ref={"completeTransactionForm"}>
                <QrReader
                    delay={this.state.delay}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    className="qr-reader"
                />
                <TextField label={"Scan"} type="password" placeholder={"Scan"} onKeyUp={this.updateName}
                           removeActive={false} autofocus={true}/>
                <div className="button-container">
                    <SubmitButton className={"btn btn-primary"} value={"Redeem Coupon"}
                                  onClick={this.createTransaction}/>
                </div>
                {this.state.transactionStateJSX}
                <div>
                    <Display value={this.state.name} label={"Name"}/>
                    <Display value={this.state.field1} label={"Product"}/>
                    <Display value={this.state.field2} label={"Discount"}/>
                    <Display value={this.state.field3} label={"Email"}/>
                    <Display value={this.state.field4} label={"Code"}/>
                </div>
            </div>
        );
    }
}

export default CompleteTransaction;