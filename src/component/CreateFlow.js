import React from 'react';
import {request} from "./reducer/request";
import {Grid, Col, Row} from "react-bootstrap";
import CreateContract from "./CreateContract";
import moment from "moment";
import CreateTransaction from "./CreateTransaction";
import CompleteTransaction from "./CompleteTransaction";

class CreateFlow extends React.Component {

    constructor(props) {
        super(props);
        this.interval = "";
    }

    componentDidMount() {
        let {email, sessionToken, setBlocks, setContracts, setTransactions} = this.props.state;
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
        
        let blocksJSX = [], blocks = this.props.state.blocks, blockKeys = blocks ? Object.keys(blocks) : [];

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
                    {i === 0 ? null : <i className={"fa fa-link fa-2x block-link"}/>}
                </div>
            )
        }
        return(
          <Grid>
            <Row className="flex">
              <Col md={6} sm={12} className="box">
                <h3> Create Coupon </h3>
                <CreateTransaction {...props}/>
              </Col>
              <Col md={6} sm={12} className="box">
                <h3> Block Explorer </h3>
                <div className="block-container">
                  {blocksJSX}
                </div>
              </Col>
            </Row>
          </Grid>
        );
    }
}

export default CreateFlow;