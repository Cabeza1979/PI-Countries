import React from 'react'
import { Link } from 'react-router-dom'
import Buttons from '../buttons'
import style from './inicio.module.css'
import imagen from '../../img/background-13.jpg';
import ico from '../../img/favicon.ico';

const Inicio= ()=> {
    return (
        <div className={style.tarjeta}>
            <Link to="/home">
                <h2>Welcome to PI of SoyHenry <img src={ico} alt=""></img></h2>
                <img src={imagen} alt=""></img>
            </Link>
        </div>
    )
}

export default Inicio