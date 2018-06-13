import React from 'react';
import {request} from "./reducer/request";
import moment from "moment";
import CreateTransaction from "./CreateTransaction";
import create_coupan_icon from "../assets/create-icon.svg";
import block_icon from "../assets/block-icon.svg";
import block_union_symbol from "../assets/block-union-symbol.svg";
import trans_icon from "../assets/trans-icon.svg";
import {get_discount} from "./utils/DiscountUtil";

class CreateFlow extends React.Component {

    constructor(props) {
        super(props);
        this.interval = "";
        this.interval1 = "";
    }

    componentDidMount() {
        let {email, sessionToken, setBlocks, setContracts, setTransactions, setSessionToken} = this.props.state;
        request('post', '/blocks', {
            email: email,
            sessionToken: sessionToken
        }, setBlocks);

        this.interval = setInterval(() => {
            request('post', '/blocks', {
                email: email,
                sessionToken: sessionToken
            }, setBlocks);

        }, 1000);

        this.interval1 = setInterval(() => {
            request('post', '/transactions', {
                email: email,
                sessionToken: sessionToken
            }, setTransactions);

        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        clearInterval(this.interval1);
    }

    renderTransactions() {
        let removeZone = (somedatetime) => {
            return somedatetime.split("[")[0];
        };


        let transactions = this.props.state.transactions,
            transactionNames = transactions ? Object.keys(transactions) : [];

        let transactionsJSX = [];
        for (let i = transactionNames.length - 1; i > -1; i--) {
            let transactionKey = transactionNames[i], transaction = transactions[transactionKey];
            let transactionValuesJSX = [];
            transactionValuesJSX.push(
                <div>
                    <div key={transaction.coupon.product}>
                        <div style={{'padding-left': '55px'}} className="transaction-label">PRODUCT:</div>
                        <div className="transaction-field">{transaction.coupon.product}</div>
                        <div className="transaction-label">DISCOUNT:</div>
                        <div className="transaction-field">{get_discount(transaction.coupon.type, transaction.coupon.discount)}</div>
                    <div>
                        <div style={{'padding-left': '55px'}} className="transaction-label">EMAIL:</div>
                        <div className="transaction-field">{transaction.coupon.mails.toString()}</div>
                    </div>
                    </div>
                </div>
            );

            transactionsJSX.push(
                <div key={i} className="transaction">
                    <div className="transaction-label">{transaction.contractName}
                        - {moment(removeZone(transaction.createdAt)).fromNow()}</div>
                    <div>
                        <div style={{'padding-left': '47px'}} className={"transaction-label"}>BLOCK DEPTH:</div>
                        <div className="transaction-field"> {transaction.address.blockDepth} </div>
                        <div className={"transaction-label"}>TRANSACTION DEPTH</div>
                        <div className={"transaction-field"}>{transaction.address.transactionDepth}</div>
                    </div>
                    {transactionValuesJSX}
                </div>
            );
        }
        return transactionsJSX;
    }

    render() {
        let props = this.props;
        let {role} = this.props.state;
        console.log("pro", this.props);
        console.log("st", this.state);
        let removeZone = (somedatetime) => {
            return somedatetime.split("[")[0];
        };

        let blocksJSX = [], blocks = this.props.state.blocks, blockKeys = blocks ? Object.keys(blocks) : [];

        for (let i = blockKeys.length - 1; i > -1; i--) {
            let block = blocks[blockKeys[i]];
            let blockData = block.blockData;
            blocksJSX.push(
                <div>
                <div key={i} className="block-section">
                    <p >Depth:</p>
                    <div >
                        <a href={"block/" + blockData.depth}>{blockData.depth}</a>
                    </div>
                    <p >Created:</p>
                    <div >
                        {moment.parseZone(blockData.blockCreatedAt.split("[")[0]).fromNow()}
                    </div>
                    <p >No. of transactions:</p>
                    <div >
                        {blockData.numberOfTransactions}
                    </div>
                </div>
                    {
                        i === 0 ? null : <div className="block-union-symbol"></div>
                    }
                </div>
            )
        }
        return (
            <div className="container">
                <div className="create-wrapper">
                    <div id="section-1">
                        <div className="create-icon"></div>
                        <div className="section-title">Create Coupon</div>
                        <CreateTransaction {...props}/>
                    </div>

                    <div id="section-2" className="block-container">
                        <div className="block-icon"></div>
                        <div className="section-title">Block Explorer</div>
                        <div className="section-divider"></div>
                        <div className="block-explorer-section">{blocksJSX} </div>
                        <div className="section-divider"></div>
                    </div>

                    <div id="section-3" className="transactions-container">
                        <div className="transactions-icon"></div>
                        <div className="section-title">Transaction History</div>
                        <div className="section-divider"></div>
                        <div className="transactions-section">
                            {this.renderTransactions()}
                        </div>
                        <div className="section-divider"></div>
                    </div>
                </div>



            </div>
        );
    }
}

export default CreateFlow;