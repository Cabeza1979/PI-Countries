import React from 'react'
import { Link } from 'react-router-dom'
import Buttons from '../buttons'
import style from './inicio.module.css'

const Inicio= ()=> {
    return (
        <div className={style.btnInicio}>
            <Link to="/home"><Buttons prop="Inicio" /></Link>
        </div>
    )
}

export default Inicio