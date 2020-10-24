import React from "react";

export default function Start(props) {
    console.log('render Start component');
    const {isSocketOpen} = props;

    return (
            isSocketOpen
                ? <button onClick={props.closeSocket} className="btn">Стоп</button>
                : <button onClick={props.onStartSocket} className="btn">Старт</button>
    )
}