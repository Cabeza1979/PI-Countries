import React from "react";
import Card from "../cardCountry";
import { Link } from "react-router-dom";

const Countries = (props)=>{
   
    return (
        props.paises.map( country =>
            <Link key={country.nombre} to= {`/country/${country.id}`}>
                <Card 
                    nombre = {country.nombre}
                    continente = {country.continente}
                    bandera = {country.bandera}
                    googlemap ={country.googlemap}
                    key= {country.nombre}
                />
            </Link>
        )
    )
}

export default Countries;