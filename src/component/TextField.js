import React from 'react';
import {Col, Row} from "react-bootstrap";

const preventCharacters = (event) => {
    let illegal = (event.key === " " || event.key === ",");
    return illegal;
};

const TextField = (props) => {
    let {label, placeholder = '', onKeyUp, type, value, disabled=false, removeActive=true, autofocus=false} = props;
    let inputType = type ? type : "text";
    let inputValue = value ? value : "";
    return (
        <div className="textfield clearfix">
            <div className="row">
            <div className="col-md-4 col-md-offset-3 text-field-label">
                {label}
            </div>
            </div>
            <div className="row">
            <div className=" col-md-6 col-md-offset-3" >
                <input className="text-field-input" type={inputType} onKeyUp={onKeyUp} onKeyDown={event => {
                    if (removeActive && preventCharacters(event)) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }}  disabled={disabled}
                       placeholder={placeholder} defaultValue={inputValue} autoFocus={autofocus}/>
            </div>
            </div>
        </div>
    );
};

export default TextField;