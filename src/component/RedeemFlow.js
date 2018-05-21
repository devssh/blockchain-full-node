import React from 'react';
import {request} from "./reducer/request";
import {Grid, Col, Row} from "react-bootstrap";
import CreateContract from "./CreateContract";
import moment from "moment";
import CreateTransaction from "./CreateTransaction";
import CompleteTransaction from "./CompleteTransaction";

class RedeemFlow extends React.Component {

    constructor(props) {
        super(props);
        this.interval = "";
    }

    componentDidMount() {
        let {email, sessionToken, setTransactions} = this.props.state;
        
        this.interval = setInterval(() => {
            request('post', '/transactions', {
                email: email,
                sessionToken: sessionToken
            }, setTransactions);

        }, 1000);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }
    render() {
        let props = this.props;
        let {role} = this.props.state;
        let removeZone = (somedatetime) => {
            return somedatetime.split("[")[0];
        };
        

        let transactions = this.props.state.transactions,
            transactionNames = transactions ? Object.keys(transactions) : [];

        let transactionsJSX = [];
        for (let i = transactionNames.length - 1; i > -1; i--) {
            let transactionKey = transactionNames[i], transaction = transactions[transactionKey];
            let transactionValuesJSX = [];
            for (let j = 0; j < transaction.values.length; j++) {
                transactionValuesJSX.push(
                    <div className={"transaction-field"} key={transaction.values[j]}>
                        {transaction.values[j]}
                    </div>
                );
            }
            transactionsJSX.push(
                <div className={"transaction"} key={i}>
                    {transaction.contractName} - {moment(removeZone(transaction.createdAt)).fromNow()}
                    <div>
                        <div className={"transaction-address"}>Block Depth: {transaction.address.blockDepth} </div>
                        <div className={"transaction-address"}>Transaction
                            Depth: {transaction.address.transactionDepth}</div>
                    </div>
                    {transactionValuesJSX}
                </div>
            );
        }
        return(
          <Grid>
            <Row className="flex">
              <Col md={6} className="box">
                <h3> Redeem </h3>
                <CompleteTransaction {...props}/>
              </Col>
              <Col md={6} className="box">
                <h3> Transactions </h3>
                <div className="block-container">
                  {transactionsJSX}
                </div>
              </Col>
            </Row>
          </Grid>
        );
    }
}

export default RedeemFlow;