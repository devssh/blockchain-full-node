import React from 'react';
import {Col, Grid, Row} from "react-bootstrap";

class BlockView extends React.Component {

    render() {
        let {sessionToken} = this.props.state;

        let backJSX = <input type={"button"} value={"Back"}/>;
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
                            <div className={"back-button"}>
                            {backJSX}
                            </div>
                            <div className={"block-details"}>
                                Hello
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