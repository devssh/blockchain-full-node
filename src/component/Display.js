import React from 'react';
import {Col} from "react-bootstrap";

const Display = (props) => {
    let {label, value} = props;
    let inputValue = value ? value : " ";
    return (
        <div className="textfield clearfix">
            <Col md={2}>
                {label}
            </Col>
            <Col md={10} className="border">
                {inputValue}
            </Col>
        </div>
    );
};

export default Display;