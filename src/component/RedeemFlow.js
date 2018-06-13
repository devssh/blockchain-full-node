import React from 'react';
import {request} from "./reducer/request";
import {Grid, Col, Row} from "react-bootstrap";
import moment from "moment";
import CompleteTransaction from "./CompleteTransaction";
import {get_discount} from "./utils/DiscountUtil";

class RedeemFlow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CompleteTransaction {...this.props}/>
        );
    }
}

export default RedeemFlow;