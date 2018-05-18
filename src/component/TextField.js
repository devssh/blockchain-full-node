import React from 'react';
import {Col, Row} from "react-bootstrap";

const preventCharacters = (event) => {
    let illegal = (event.key === " " || event.key === ",");
    return illegal;
};

const TextField = ({label, placeholder, onKeyUp, type, value}) => {
    let inputType = type ? type : "text";
    let inputValue = value ? value : "";
    return (
        <div className="textfield clearfix">
            <Col md={2}>
                {label}
            </Col>
            <Col md={10}>
                <input type={inputType} onKeyUp={onKeyUp} onKeyDown={event => {
                    if (preventCharacters(event)) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }}
                       placeholder={placeholder} defaultValue={inputValue}/>
            </Col>
        </div>
    );
};

export default TextField;