import React from "react";
import card from "./cardCountry.module.css"

const CardCountry = (props)=>{
    
    return (
        <div key = {props.nombre} className = {card.tarjeta}>
            <h1>{props.nombre}</h1>
            <h4>{props.continente}</h4>
            <img type="image/svg+xml" alt="National flag" src={props.bandera} />
        </div>
)
}

export default CardCountry;