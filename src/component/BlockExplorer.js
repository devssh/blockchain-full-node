import React from 'react';
import {request} from "./reducer/request";
import {Col, Row} from "react-bootstrap";
import CreateContract from "./CreateContract";

class BlockExplorer extends React.Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        request('post', '/blocks', {
            email: props.state.email,
            sessionToken: props.state.sessionToken
        }, props.state.setBlocks);

        request('post', '/contracts', {
            email: props.state.email,
            sessionToken: props.state.sessionToken
        }, props.state.setContracts);

    }

    logout() {
        this.props.state.setEmail("");
        this.props.state.setSessionToken({sessionToken: ""});
    }

    render() {
        console.log("blocks", this.props.state.blocks);
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
                    {contract.name} - {contract.createdAt}
                    <div>
                        Block Depth: {contract.address.blockDepth} Transaction
                        Depth: {contract.address.transactionDepth}
                    </div>
                    {contractFieldsJSX}
                </div>
            );
        }


        let blocksJSX = [], blocks = this.props.state.blocks, blockKeys = Object.keys(blocks);

        for (let i = 0; i < blockKeys.length; i++) {
            let block = blocks[blockKeys[i]];
            blocksJSX.push(
                <div className={"block"} key={i}>
                    {block.sign}
                </div>
            )
        }

        return (
            <Row className={"block-explorer"}>
                <Row className={"explorer-header"}>
                    <div className={"panel-headers"}>
                        <input type="button" value="View Transactions"/>
                        <input type="button" className={"vertical-split"} value="Start Transaction"/>
                        <input type="button" value="Complete Transaction"/>
                    </div>
                    <div className={"logout-panel"}>
                        <input type="button" value={"Logout " + this.props.state.email} onClick={this.logout}/>
                    </div>
                </Row>
                <Row className={"block-explorer-body"}>
                    <Col md={4} className={"create-contract"}>
                        <CreateContract/>
                        <div className={"show-contracts"}>
                            {contractsJSX}
                        </div>
                    </Col>
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