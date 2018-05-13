import React from 'react';
import {Col, Grid, Row} from "react-bootstrap";
import {request} from "./reducer/request";
import BlockDetail from "./BlockDetail";

class BlockView extends React.Component {

    constructor(props) {
        let {email, sessionToken, setBlocks} = props.state;
        super(props);
        request('post', '/blocks', {
            email: email,
            sessionToken: sessionToken
        }, setBlocks);
    }

    render() {
        let reverse = (somestr) => {
            return somestr ? somestr.split("").reverse().join("") : null;
        };
        let {match} = this.props;
        let {sessionToken, blocks} = this.props.state;
        let block = blocks[match.params.blockDepth] || {sign: "", blockData: {previousBlockSign: ""}};
        let blockDetail = block.blockData;


        let backJSX = (
            <div className={"back-button"}>
                <a href={"/"}>
                    <input type={"button"} value={"Back"}/>
                </a>
            </div>
        );
        console.log("data", blockDetail);
        let blockDetailsJSX = [];
        blockDetailsJSX.push(
            <BlockDetail label={"Block Signature:"} detail={reverse(block.sign)}/>
        );
        blockDetailsJSX.push(
            <BlockDetail label={"Public Key:"} detail={reverse(block.publicKey)}/>
        );
        blockDetailsJSX.push(
            <BlockDetail label={"Depth:"} detail={blockDetail.depth}/>
        );
        blockDetailsJSX.push(
            <BlockDetail label={"Block Created At:"} detail={blockDetail.blockCreatedAt}/>
        );
        blockDetailsJSX.push(
            <BlockDetail label={"Nonce:"} detail={blockDetail.nonce}/>
        );
        blockDetailsJSX.push(
            <BlockDetail label={"No. of Txns:"} detail={blockDetail.numberOfTransactions}/>
        );
        blockDetailsJSX.push(
            <BlockDetail label={"Prev. Block Sign:"}
                         detail={reverse(blockDetail.previousBlockSign)}/>
        );
        blockDetailsJSX.push(
            <BlockDetail label={"Merkle root:"} detail={reverse(blockDetail.merkleRoot)}/>
        );


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
                    {sessionToken && sessionToken !== "undefined" ? (
                        <div className={"block-view"}>
                            {backJSX}
                            <div className={"block-details"}>
                                {blockDetailsJSX}
                            </div>
                        </div>
                    ) : (
                        backJSX
                    )}
                </Grid>
            </div>
        );
    }
}

export default BlockView;