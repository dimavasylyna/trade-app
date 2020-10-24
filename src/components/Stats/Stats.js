import React from "react";

export default function Stats(props) {
    console.log('render Stats component');
    const isDisabled = props.isDataReadyToCalc ? false : true;
    return (
        <button disabled={isDisabled} onClick={props.calcData} className="btn">Статистика</button>
    )
}