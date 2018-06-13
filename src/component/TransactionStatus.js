import React from "react";

const TransactionStatus = ({imgsrc, className, label}) => {
    return (
        <div className={`transaction-status ${className}`}>
            <div>
                <img src={imgsrc}/>
                <p className="status-label">{label}</p>
            </div>
        </div>
    )

}

export default TransactionStatus