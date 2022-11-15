import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react';
import style from './actDetails.module.css';
import Btns from '../buttons';
import { Link } from 'react-router-dom';

const ActDetails= ({match}) =>{
//   console.log(`/activities/${match.params.id}`);

  const [activity, setActivity] = useState({});
    
  useEffect(() => {
    axios.get(`/activities/${match.params.id}`)
      .then(data => setActivity(data.data))
    
  },[match.params.id]);

  const deleteAct=()=>{
    console.log("Activity", match.params.id);
    let id=match.params.id
    axios.delete(`/activities/${id}`)
    .then(() => alert('Delete successful'));
    document.querySelector('#btn1').click();
}

    const modificarAct=()=>{

    }

    const addCountriesAct=()=>{

    }
    // console.log("activity: ", activity)

  return (
    
    <div className={style.container}>
      <div className={style.volver}>
        <Link to="/allactivities" id="btn1"> <Btns prop="Back" /></Link>
      </div>
        
         <hr></hr>
        <h1>{activity.nombre}</h1>
        <hr></hr>
     
        <p>Difficult: <b>{activity.dificultad}</b></p>
        <p>Duration: <b>{activity.duracion}</b></p>
        <p>Seasson: <b>{activity.temporada}</b></p>
        <hr></hr>
        <div className={style.volver}>
        <button className={style.boton} onClick={deleteAct}>Delete</button>
        <button className={style.boton} onClick={modificarAct}>Modify</button>
        <button className={style.boton} onClick={addCountriesAct}>Add Countries</button>
        </div>

        <hr></hr>
        <p>Countries where you can perform {activity.nombre}</p>
        {
        activity.countries? activity.countries.map((country) => 
            <div >
                <Link key={country.nombre} to= {`/country/${country.id}`}>
                    <h3>{country.nombre}</h3>
                    <img className={style.bandera} type="image/svg+xml" alt="National flag" src={country.bandera} />
                </Link>
                </div>
            ) : <h2>No countries</h2>
        }
    </div>
  )

};

export default ActDetails;