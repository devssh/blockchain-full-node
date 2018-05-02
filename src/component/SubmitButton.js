import React from 'react';
import {Row} from "react-bootstrap";

const SubmitButton = ({className, value, onClick}) => {
    return (
        <Row className={className}>
            <input type="button" value={value} onClick={onClick}/>
        </Row>
    );
};

export default SubmitButton;