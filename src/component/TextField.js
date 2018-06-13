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
        <div className="text-field">
            <p>{label}</p>
                <input type={inputType} onKeyUp={onKeyUp} onKeyDown={event => {
                    if (removeActive && preventCharacters(event)) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }}  disabled={disabled}
                       placeholder={placeholder} defaultValue={inputValue} autoFocus={autofocus}/>
        </div>
    );
};

export default TextField;