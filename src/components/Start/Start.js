import React from "react";

export default function Start(props) {
    console.log('render Start component');
    return (
        <button onClick={props.onStartSocket} className="btn">Start</button>
    )
}