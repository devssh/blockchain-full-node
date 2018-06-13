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

    renderTransactions(){
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
                    <div key={transaction.coupon.product} style={{'padding-left': '10px'}}>
                        <div className={"transaction-label"}>Product Name :</div>
                        <div className="transaction-field">{transaction.coupon.product}</div>
                        <div className={"transaction-label"}>Discount :</div>
                        <div className="transaction-field">{get_discount(transaction.coupon.type, transaction.coupon.discount)}</div>
                    </div>
                    <div style={{'padding-left': '10px'}}>
                        <div className={"transaction-label"}>Email IDs :</div>
                        <div className="transaction-field">{transaction.coupon.mails.toString()}</div>
                    </div>
                </div>
            );

            transactionsJSX.push(
                <div className={"transaction col-md-8 col-md-offset-2"} key={i}>
                    <div className="transaction-title">{transaction.contractName} - {moment(removeZone(transaction.createdAt)).fromNow()}</div>
                    <div>
                        <div className={"transaction-label"}>BLOCK DEPTH:</div>
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
        console.log("pro",this.props);
        console.log("st",this.state);
        let removeZone = (somedatetime) => {
            return somedatetime.split("[")[0];
        };

        let blocksJSX = [], blocks = this.props.state.blocks, blockKeys = blocks ? Object.keys(blocks) : [];

        for (let i = blockKeys.length - 1; i > -1; i--) {
            let block = blocks[blockKeys[i]];
            let blockData = block.blockData;
            blocksJSX.push(
                <div key={i} className="row">
                    <div className="row">
                    <div className={"block col-md-8 col-md-offset-2"}>
                        <div className='row'>
                        <div className={"col-md-4 block-preview"}>
                            <p className="block-preview-label">Depth:</p>
                            <div className={"block-data"}>
                                <a href={"block/" + blockData.depth}>{blockData.depth}</a>
                            </div>
                        </div>
                        <div className={"col-md-4 block-preview"}>
                            <p className="block-preview-label">Created:</p>
                            <div className={"block-data"}>
                                {moment.parseZone(blockData.blockCreatedAt.split("[")[0]).fromNow()}
                            </div>
                        </div>
                        <div className={"col-md-4 block-preview"}>
                            <p className="block-preview-label">No. of transactions:</p>
                            <div className={"block-data"}>
                                {blockData.numberOfTransactions}
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    {i === 0 ? null : <center><img className="block-union-symbol" src={block_union_symbol}></img></center>
                    }
                </div>
            )
        }
        return(
          <div className="container">
              <div id="section-1">
                  <img className="section-icon" src={create_coupan_icon}></img>
                  <div className="section-label"> Create Coupon</div>
                <CreateTransaction {...props}/>
              </div>
              <div id="section-2">
                  <img className="section-icon" src={block_icon}></img>
                  <div className="section-label">Block Explorer</div>
                  <div className="section-divider col-md-10 col-md-offset-1"></div>
                <div className="block-container">
                  {blocksJSX}
                </div>
                  <div className="section-divider col-md-10 col-md-offset-1"></div>
              </div>
              <div id="section-3">
                  <img className="section-icon" src={trans_icon}></img>
                  <div className="section-label">Transaction History</div>
                  <div className="section-divider col-md-10 col-md-offset-1"></div>
                  <div className="block-container">
                      {this.renderTransactions()}
                  </div>
                  <div className="section-divider col-md-10 col-md-offset-1"></div>
              </div>
          </div>
        );
    }
}

export default CreateFlow;