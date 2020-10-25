import React from "react";
import s from './Loader.module.css';

export default function Loader(props) {
    return (
        <div className={s.loader}>
            <div className={s.lds_ring}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p className={s.text}>{props.text}</p>
        </div>
    )
}