import React from "react";
import card from "./cardCountry.module.css"

const CardCountry = (props)=>{
    
    return (
        <div key = {props.nombre} className = {card.tarjeta}>
            <h3>{props.nombre}</h3>
            <h3>{props.continente}</h3>
            <img type="image/svg+xml" alt="National flag" src={props.bandera} />
        </div>
)
}

export default CardCountry;