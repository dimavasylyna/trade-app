import React from "react";
import s from './Loader.module.css';
import PropTypes from 'prop-types';

export default function Loader(props) {
    return (
        <div className={s.loader}>
            <div className={s.lds_ring}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            {
                props.text && <p className={s.text}>{props.text}</p>
            }
        </div>
    )
}

Loader.propTypes = {
    text: PropTypes.string,
}