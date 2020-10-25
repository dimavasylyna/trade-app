import React from "react";
import PropTypes from 'prop-types';

export default function Start(props) {
    const {isDataReadyToCalc} = props;

    return (
        isDataReadyToCalc
            ? <button onClick={props.closeSocket} className="btn">Розірвати з'єднання</button>
            : <button onClick={props.onStartSocket} className="btn">Старт</button>
    )
}

Start.propTypes = {
    onStartSocket: PropTypes.func.isRequired,
    closeSocket: PropTypes.func.isRequired,
    isDataReadyToCalc: PropTypes.bool.isRequired,
}