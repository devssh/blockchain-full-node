import React from 'react';
import {Col} from "react-bootstrap";

const Display = (props) => {
    let {label, value} = props;
    let inputValue = value ? value : " ";
    return (
        <div className="coupon-info-item">
            <p>{label}</p>
            <div>{inputValue}</div>
        </div>
    );
};

export default Display;