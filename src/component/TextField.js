import React from 'react';
import {Col, Row} from "react-bootstrap";

const preventCharacters = (event) => {
    let illegal = (event.key === " " || event.key === ",");
    return illegal;
};

const TextField = ({label, placeholder, onKeyUp, type}) => {
    let inputType = type ? type : "text";
    return (
        <Row className={"textfield "}>
            <Col md={1} className={"label"}>
                {label}
            </Col>
            <Col md={4}>
                <input type={inputType} onKeyUp={onKeyUp} onKeyDown={event => {
                    if (preventCharacters(event)) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }}
                       placeholder={placeholder}/>
            </Col>
        </Row>
    );
};

export default TextField;