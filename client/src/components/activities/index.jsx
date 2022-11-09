import React from "react";
import { useParams } from "react-router-dom";
import style from "./activities.module.css"

const Activities = (props)=>{
    console.log("En Activities",props);
    return (
        <div className={style.actividad}>
          <h2>Actividad: {props.nombre}</h2>
          {/* <p>Temporada: {props.temporada}</p>
          <p>Duracion: {props.duracion} minutos</p>
          <p>Dificultad: {props.dificultad}</p> */}
        </div>
      )
}

export default Activities;