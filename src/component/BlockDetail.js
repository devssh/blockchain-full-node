import React from 'react';

const BlockDetail = ({label, detail}) => {
    return (
        <div className={"block-detail " + (detail ? "" : "remove-margin" )} key={label}>
            <div className={"block-detail-label"}>
                {label}
            </div>
            {detail || detail === 0 ?
                <div className={"block-data " + (detail.length > 47 ? "huge-block-data" : "")}>
                    {detail}
                </div>
                : null}
        </div>
    );
};

export default BlockDetail;