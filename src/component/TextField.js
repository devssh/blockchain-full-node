import React from 'react';
import {Col, Row} from "react-bootstrap";

const preventCharacters = (event) => {
    let illegal = (event.key === " " || event.key === ",");
    return illegal;
};

const TextField = (props) => {
    let {label, placeholder = '', onKeyUp, type, value, disabled=false, removeActive=true} = props;
    let inputType = type ? type : "text";
    let inputValue = value ? value : "";
    return (
        <div className="textfield clearfix">
            <Col md={2}>
                {label}
            </Col>
            <Col md={10}>
                <input type={inputType} onKeyUp={onKeyUp} onKeyDown={event => {
                    if (removeActive && preventCharacters(event)) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }}  disabled={disabled}
                       placeholder={placeholder} defaultValue={inputValue}/>
            </Col>
        </div>
    );
};

export default TextField;