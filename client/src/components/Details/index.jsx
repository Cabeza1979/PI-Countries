import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react';
import style from './Details.module.css'
import Btns from '../buttons'
import { Link } from 'react-router-dom'

const Details= ({match}) =>{
  console.log(`/countries/${match.params.idCountry}`);

  const [country, setCountry] = useState({});

  useEffect(() => {
    axios.get(`/countries/${match.params.idCountry}`)
      .then(data => setCountry(data.data))

  },[match.params.idCountry]);

  console.log(country);

  function area(valor) {
    if (!valor) return
    if (valor > 1000000) {
      return Math.round(valor / 1000000 * 100) / 100 + " Millones de Km2"
    } else if (valor > 100000) {
      return (valor / 1000 + " Km2")
    } else if (valor > 10000) {
      return valor / 1000 + " Km2"
    } else {
      return valor + "m2"
    }
  };

  function numerar(valor) {
    if (!valor) return
    let res = []
    const newNumber = valor.toString().split('').reverse().join('')
    for (let i = 1; i <= newNumber.length; i++) {
      if (i % 3 - 1 === 0) res.push('.')
      res.push(newNumber[i - 1])
    }
    res.shift()
    res = res.reverse().join('')
    return res;
  };
  console.log(country.activities);
  return (
    <div className={style.container}>
      <div className={style.volver}><Link to="/home"> <Btns prop="Home" /></Link></div>
      <h1>{country.nombre}</h1>
      <img className={style.bandera} type="image/svg+xml" alt="bandera" src={country.bandera} />
      <hr></hr>
      {country.escudo ? <img className={style.escudo} type="image/svg+xml" alt="escudo" src={country.escudo} /> : <p></p> }
      <h3><a href={country.googlemap} target= "_blank" >Go to Google Map</a></h3>
      <p>Capital: <b>{country.capital}</b></p>
      <p>Continent <b>{country.continente}</b></p>
      <p>Sub region: <b>{country.subregion}</b></p>
      <p>Area: <b>{area(country.area)}</b></p>
      <p>Population: <b>{numerar(country.poblacion)}</b></p>
      
      <hr></hr>
      {country.activities ? country.activities.map((act) => 
      <div className={style.actividad}>
      <h2>Activity: {act.nombre}</h2>
      <p>Season: {act.temporada}</p>
      <p>Duration: {act.duracion} minutos</p>
      <p>Difficulty: {act.dificultad}</p>
      </div>) : <h2>No activities</h2>}
    </div>
  )

};

export default Details;