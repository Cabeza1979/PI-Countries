import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react';
import style from './actDetails.module.css';
import Btns from '../buttons';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions';
import Modal from "../modal";


const ActDetails= (props) =>{
  
  const [activity, setActivity] = useState({});
  const [paisesSeleccionados, setPaisesSeleccionados] = useState([]);  
  const [options, setOptions] = useState([]);
  const [isModalOpen, setIsModalOpen]= useState(false);
  // const [formData, setFormData] = useState({ });
 
     
  useEffect(() => {
      
      axios.get(`/activities/${props.match.params.id}`)
        .then(data => setActivity(data.data));
  },[paisesSeleccionados]);

  const deleteAct=()=>{
      
      let id=props.match.params.id
      axios.delete(`/activities/${id}`)
      .then(alert("Activity deleted"));
    
     document.querySelector('#btn1').click();
  }


  const saveCountriesHandler=()=>{
console.log("save countries");
    let newCountriesList=[];
    newCountriesList = paisesSeleccionados.map((e)=>{
    return e.value
      })
    axios.put(`activities/updatecountries/${props.match.params.id}`, {
      "id": newCountriesList
       })
    .then((res)=> console.log(res))
    .catch((e)=>e);
    setPaisesSeleccionados(newCountriesList);
   document.getElementById('btnCancel').click();
}

const addDelCountriesAct=()=>{
  let opciones = [];
    props.country.forEach(element => {
        opciones.push({ value: element.id, label: element.nombre })
    })
    setOptions(opciones);

  document.getElementById("divSelector").hidden=false;
  document.getElementById("btnDel").hidden= true;  
  document.getElementById("btnAddDel").hidden= true;

  let countriesSelected=[];
  activity.countries.forEach(element => {
    countriesSelected.push({ value: element.id, label: element.nombre })
    setPaisesSeleccionados(countriesSelected);
      })

}

const cancelHandler=()=>{
     
      document.getElementById("divSelector").hidden=true;
      document.getElementById("btnDel").hidden= false;  
      document.getElementById("btnAddDel").hidden= false;
 
    }
   
   // console.log("paises seleccionados: ", paisesSeleccionados)

  return (
    
    <div className={style.container}>
      <div className={style.volver}>
        <Link to="/allactivities" id="btn1"> <Btns prop="Back" /></Link>
      </div>
        
         <hr></hr>
        <h1>{activity.nombre}</h1>
        <hr></hr>
     
        <p>Difficult: <b>{activity.dificultad}</b> 
        </p> 

        <p>Duration: <b>{activity.duracion}</b>
                     
        </p>
        <p>Seasson: <b>{activity.temporada}</b>

        
        </p>
        <hr></hr>
        <div className={style.volver}>
        <button id="btnDel" className={style.boton} onClick={deleteAct}>Delete</button>
        <Modal isModalOpen={isModalOpen} setIsMOdalOpen={setIsModalOpen} Text="Delet Activty?"/>
        <button id="btnAddDel" className={style.boton} onClick={addDelCountriesAct}>Add/Del Countries</button>
        </div>
        <div id="divSelector" hidden>
        <h2>Select / Delete countries</h2>

                <Select id="idSelect" className={style.listado} value={paisesSeleccionados} options={options} isMulti onChange={setPaisesSeleccionados} />
                <button id="btnCancel" className={style.boton} onClick={cancelHandler}>Cancel</button>
                <button  className={style.boton} onClick={saveCountriesHandler}>Save</button>
        </div>
        <hr></hr>
        <div className={style.container}>
        <p>Countries where you can perform {activity.nombre}</p>
        
        {
        activity.countries? activity.countries.map((country) => 
             
                <Link key={country.nombre} to= {`/country/${country.id}`}>
                    <h3>{country.nombre}</h3>
                    <img className={style.bandera} type="image/svg+xml" alt="National flag" src={country.bandera} />
                </Link>
              
            ) : <h2>No countries</h2>
        }
        
        </div>
    </div>
  )
};

function mapStateToProps(state) {
  return {
      country: state.country,      
  }
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ActDetails)
