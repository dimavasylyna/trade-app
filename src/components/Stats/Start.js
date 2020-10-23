import React from "react";

export default function Stats(props) {
    console.log('render Stats component');
    return (
        <button onClick={props.closeSocket} className="btn">Close socket</button>
    )
}