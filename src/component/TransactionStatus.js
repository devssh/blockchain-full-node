import React from "react";

const TransactionStatus = ({imgsrc, className, label}) => {
  return(
    <div className={"transactionState " + className }>
      <img src={imgsrc} width="50"/>
      {label}  
    </div>
  )
  
}

export default TransactionStatus