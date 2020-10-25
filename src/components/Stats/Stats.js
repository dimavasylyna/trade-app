import React from "react";
import PropTypes from 'prop-types';

export default function Stats(props) {
    const isDisabled = props.isDataReadyToCalc ? false : true;

    return (
        <button disabled={isDisabled} onClick={props.getCalcData} className="btn">Статистика</button>
    )
}

Stats.propTypes = {
    getCalcData: PropTypes.func.isRequired,
    isDataReadyToCalc: PropTypes.bool.isRequired,
    isDataReadyToShow: PropTypes.bool.isRequired,
}