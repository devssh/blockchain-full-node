import React from 'react';
import {request} from "./reducer/request";
import {Col, Row} from "react-bootstrap";
import CreateContract from "./CreateContract";
import moment from "moment";

class BlockExplorer extends React.Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.state.setEmail("");
        this.props.state.setSessionToken({sessionToken: ""});
        this.props.state.setLogin({activation: undefined});
    }

    componentDidMount() {
        let {email, sessionToken, setBlocks, setContracts} = this.props.state;
        request('post', '/blocks', {
            email: email,
            sessionToken: sessionToken
        }, setBlocks);

        request('post', '/contracts', {
            email: email,
            sessionToken: sessionToken
        }, setContracts);
        setInterval(() => {
            request('post', '/blocks', {
                email: email,
                sessionToken: sessionToken
            }, setBlocks);

            request('post', '/contracts', {
                email: email,
                sessionToken: sessionToken
            }, setContracts);
        }, 1000);
    }

    render() {
        let contracts = this.props.state.contracts;
        let contractNames = Object.keys(contracts);

        let contractsJSX = [];
        for (let i = 0; i < contractNames.length; i++) {
            let contractKey = contractNames[i], contract = contracts[contractKey];
            let contractFieldsJSX = [];
            for (let j = 0; j < contract.fields.length; j++) {
                contractFieldsJSX.push(
                    <div className={"contract-field"} key={contract.fields[j]}>
                        {contract.fields[j]}
                    </div>
                );
            }
            contractsJSX.push(
                <div className={"contract"} key={contract.name}>
                    {contract.name} - {moment(contract.createdAt).fromNow()}
                    <div>
                        <div className={"contract-address"}>Block Depth: {contract.address.blockDepth} </div>
                        <div className={"contract-address"}>Transaction Depth: {contract.address.transactionDepth}</div>
                    </div>
                    {contractFieldsJSX}
                </div>
            );
        }


        let blocksJSX = [], blocks = this.props.state.blocks, blockKeys = Object.keys(blocks);

        for (let i = blockKeys.length - 1; i > -1; i--) {
            let block = blocks[blockKeys[i]];
            let blockData = block.blockData;
            blocksJSX.push(
                <div key={i}>
                    <div className={"block"}>
                        <div className={"block-preview"}>
                            Depth:
                            <div className={"block-data"}>
                                <a href={"block/" + blockData.depth}>{blockData.depth}</a>
                            </div>
                        </div>
                        <div className={"block-preview"}>
                            Created:
                            <div className={"block-data"}>
                                {moment.parseZone(blockData.blockCreatedAt.split("[")[0]).fromNow()}
                            </div>
                        </div>
                        <div className={"block-preview"}>
                            No. of transactions:
                            <div className={"block-data"}>
                                {blockData.numberOfTransactions}
                            </div>
                        </div>
                    </div>
                    {i === 0 ? null : <i className={"fa fa-link fa-3x block-link"}/>}
                </div>
            )
        }

        let createContract = (
            <Col md={4} className={"create-things"}>
                <div className={"show-contracts"}>
                    {contractsJSX}
                </div>
                <CreateContract/>
            </Col>
        );
        let createTransaction = (
            <Col md={4} className={"create-things"}>
                <div className={"show-contracts"}>
                    {contractsJSX}
                </div>
            </Col>
        );
        let completeTransaction = (
            <Col md={4} className={"create-things"}>
                <div className={"show-contracts"}>
                    {contractsJSX}
                </div>
            </Col>
        );

        return (
            <Row className={"block-explorer"}>
                <Row className={"explorer-header"}>
                    <div className={"panel-headers"}>
                        <input type="button" value="Create Contract" onClick={() => {
                            this.props.state.setView("contract")
                        }}/>
                        <input type="button" className={"vertical-split"} value="Start Transaction" onClick={() => {
                            this.props.state.setView("createTransaction")
                        }}/>
                        <input type="button" value="Complete Transaction" onClick={() => {
                            this.props.state.setView("completeTransaction")
                        }}/>
                    </div>
                    <div className={"logout-panel"}>
                        <input type="button" value={"Logout " + this.props.state.email} onClick={this.logout}/>
                    </div>
                </Row>
                <Row className={"block-explorer-body"}>

                    {this.props.state.createView === "contract" ?
                        createContract : this.props.state.createView === "createTransaction" ?
                            createTransaction : this.props.state.createView === "completeTransaction" ?
                                completeTransaction :
                                null}

                    <Col md={5} className={"blocks"}>
                        {blocksJSX}
                    </Col>
                    <Col md={3} className={"transactions"}>
                        Show transactions here
                    </Col>
                </Row>
            </Row>
        );
    }
}

export default BlockExplorer;