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
        let blockDetailsJSX = [];
        blockDetailsJSX.push(
            <BlockDetail label={"Block Signature:"} detail={block.sign.split("").reverse().join("")}/>
        );
        blockDetailsJSX.push(
            <BlockDetail label={"Public Key:"} detail={block.publicKey}/>
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
                         detail={blockDetail.previousBlockSign.split("").reverse().join("")}/>
        );
        blockDetailsJSX.push(
            <BlockDetail label={"Merkle root:"} detail={blockDetail.merkleRoot}/>
        );


        console.log("block", block);
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