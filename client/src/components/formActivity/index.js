import React, { useEffect } from "react";
import * as actionCreators from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import style from './form.module.css'
import Btns from './../buttons';
import { Link } from 'react-router-dom';
import Select from 'react-select';

function FormActivity({ postActivity, country }) {
    const [formData, setFormData] = React.useState({ name: "", dificultad: 1, duracion: 0, temporada: "Summer", pais: [] });
    const [error, setError] = React.useState({name: "", duracion: ""});
    const [options, setOptions] = React.useState([]);
    const [paisesSeleccionados, setPaisesSeleccionados] = React.useState([]);

    useEffect(() => {
        let opciones = [];
        country.forEach(element => {
            opciones.push({ value: element.id, label: element.nombre })
        })
        setOptions(opciones);

    }, [country])

      async function handleSubmit(e) {
        e.preventDefault();
       // let lista = paisesSeleccionados;
        let paises=[];
        paisesSeleccionados.forEach((p)=>{
             paises.push(p.value)
        })
        console.log("paises selec ", paises);  
        if (paises.length===0) return alert("Select at least one country")
        
        if (paises.length > 0 && error.name === "" && error.duracion === "") {
      
        let data = { nombre: formData.name, dificultad: formData.dificultad, duracion: formData.duracion, temporada: formData.temporada, pais: paises}
      
            const result =  await postActivity(data)
            console.log("resultado: ", result);
            if(result){
                setFormData({ name: "", dificultad: 1, duracion: 10, temporada: "Summer", pais: [] })
                setPaisesSeleccionados([])
                alert('Activities saved successfully')
            }
         } 
          else {
            alert("There was a mistake")
         }
    }

    function handleChange(e) {
        setFormData((prevData) => {
            const state = { ...prevData, [e.target.name]: e.target.value }
            const validations = validate(state);
            setError(validations);
            return state;
        })
    }

    return (
        <>
            <form className={style.formulario} onSubmit={handleSubmit}>
                <div className={style.inputs}>
                    <h2>Name of Activity</h2>
                    <br></br>
                    <input className="input" name={"name"} value={formData.name} onChange={handleChange} />
                </div>
                <span>{error.name}</span>
                <div className={style.inputs}>
                    <br></br>
                    <label><b>Duration (minutes)</b></label>
                    <input className={style.inputDuracion} type="number" name={"duracion"} value={formData.duracion} onChange={handleChange} min="1" />
                </div>
                <span>{error.duracion}</span>
                <br></br>
                <div className={style.inputs}>
                    <label><b>Difficulty</b></label>
                    <input type="range" name="dificultad" min="1" max="5" step="1" value={formData.dificultad} onChange={handleChange} />
                </div>
                <br></br>
                <div className={style.inputs}>
                    <label><b>Season</b></label>
                    <select className={style.input} name="temporada" onChange={handleChange}>
                        <option>Summer</option>
                        <option>Fall</option>
                        <option>Winter</option>
                        <option>Spring</option>
                    </select>
                </div>
                <div>
                <hr></hr>
                <ul className="listaBtn">
                    <li >
                        <input className={style.boton} type="submit" value="Guardar" />
                    </li>
                    <li >
                    <Link to="/home"> <Btns prop="Volver" /> </Link>
                    </li>
                </ul>
                </div>
            </form>

            <form className={style.formulario}>
                <h2>Select countries</h2>

                <Select className={style.listado} value={paisesSeleccionados} options={options} isMulti onChange={setPaisesSeleccionados} />
            </form>

        </>
    )
}

function validate(data) {
    const error = {name: "", duracion: ""}
    if (!data.name) error.name = "You must enter the name of the activity"
    if (!data.duracion || data.duracion === 0) error.duracion = "You must enter the duration"
    return error;
}

function mapStateToProps(state) {
    return {
        country: state.country,
        
    }
}

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FormActivity)
