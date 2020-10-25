import React from "react";
import s from './DisplayData.module.css';
import PropTypes from 'prop-types';

export default function DisplayData(props) {
    let theadCell = Object.keys(props.displayData).map((item, index) => {
        return <td key={index}>{item}</td>
    });

    let tBodyCell = Object.values(props.displayData).map((item, index) => {
        return <td key={index}>{item}</td>
    });

    return (
        <div className={s.data}>
            <table>
                <thead>
                    <tr>
                        {theadCell}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {tBodyCell}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

DisplayData.propTypes = {
    displayData: PropTypes.shape({
        mean: PropTypes.number.isRequired,
        populationStdev: PropTypes.number.isRequired,
        time: PropTypes.number.isRequired
    })
}