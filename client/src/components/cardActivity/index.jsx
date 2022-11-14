import React from "react";

import cardActivity from "./cardActivity.module.css"

const CardActivity = (props)=>{
    

    return (
        <div key = {props.nombre} className={cardActivity.tarjeta}>
            
            <h1>{props.nombre}</h1>
            <h3>Difficult: {props.dificultad} (of 5)</h3>
            <h3>Duration: {props.duracion} minutes</h3>
            <h3>Seasson: {props.temporada}</h3>
            <br />
            <button className={cardActivity.boton} onClick={props.onDelete}>Delete</button>
        </div>
)
}


export default CardActivity
