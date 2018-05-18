import React from 'react';


const SubmitButton = ({className, value, onClick}) => {
    return (
        <div>
            <input type="button"  className={className} value={value} onClick={onClick}/>
        </div>
    );
};

export default SubmitButton;