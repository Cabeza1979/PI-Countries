import React from "react";
import { useParams } from "react-router-dom";

const Activities = (props)=>{
const params = useParams();
    return(
        <>
            <h1>Aca se renderizan las Actividades</h1>

            <h3>{params.id}</h3>
            
        </>
    )
}

export default Activities;