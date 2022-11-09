import React from "react";
import style from './buttons.module.css'

const Buttons= ({prop, action})=> { 
    if (!action) {
        action = () => {}
    } 
    return (
        <button key={prop} className={style.boton} onClick={action}>{prop}</button>
    )
}

export default Buttons;