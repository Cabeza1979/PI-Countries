import React, { useEffect } from 'react';
import style from './navbar.module.css';
import * as actionCreators from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Btns from './../buttons';
import axios from 'axios';

const Navbar = (props) =>{

    const [continents, setContinents] = React.useState([]);
    const [activities, setActivities] = React.useState([]);

    useEffect(() => {
        axios.get('/countries/continents')
            .then(data => setContinents(data.data))
    axios.get('/activities')
            .then(data => setActivities(data.data))
    }, []);

    // Paso primer caracter a mayuscula
    function normalizeName(str) {
        const lower = str.toLowerCase();
        return str.charAt(0).toUpperCase() + lower.slice(1);
    }

    const handleChange = function (e) {
        
        props.reset();
       props.filterBySearch(normalizeName(e.target.value))
       //console.log(e.target.value);
    }

    const filterChange = function (e) {
        console.log("orden alfabetico");
        props.reset()
        props.filterByAlph(e.target.value)
    }

    const filterContinent = function (e) {
        props.reset()
        props.filterByContinent(e.target.value)
    }

    const filterActivity = function (e) {
        props.reset()
        if(e.target.value)
        props.fetchActivity(e.target.value);
        else props.fetchCountry();
    }

    const OrderByPopulation = function (e) {
        props.reset()
        props.orderCountry(e.target.value);
    }

    const renderizarActividades = function () {
        var newArray = [];
        var lookupObject = {};

        for (var i in activities) {
            lookupObject[activities[i].nombre] = activities[i];
        }

        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return (newArray.map(element => <option key={element.id * 10}>{element.nombre}</option>))
    }

    return (<>
        <nav>
            <label className={style.logo}>Countries</label>
            <input id={style.check} type="checkbox" />
            <ul className={style.links}>
                <li> <select name="OrderByAlph" className={style.orden} onChange={filterChange}>
                    <option value="">Order Alphabetically</option>
                    <option value="a-z"> A-Z </option>
                    <option value="z-a"> Z-A </option>
                </select></li>
                <li><select name="OrderByPopulation" className={style.orden} onChange={OrderByPopulation}>
                    <option value="">Order by population</option>
                    <option value="dec">Major population</option>
                    <option value="asc">Minor population</option>
                </select> </li>
                <li><select name="FilterByContinent" className={style.orden} onChange={filterContinent}>
                    <option value="">Continents</option>
                    { continents ? continents.map(c => <option key={c}>{c}</option>) : <h1>Hubo un problema con la Ap"</h1>}
                </select></li>
                <li><select name="FilterByActivity" className={style.orden} onChange={filterActivity}>
                    <option value="">Activities</option>
                    {renderizarActividades()}
                </select></li>
                <li>
                    <input className={style.buscador} name="countrySearch" value={props.inputText} onChange={handleChange} placeholder="Search by name" />
                    
                </li>
                <li>
                    <Link to="/allactivities" ><Btns prop="All Activities" /></Link>
                   
                </li>
                <li>
                    <Link to="/activity"><Btns prop="+ Activity" /></Link>
                </li>
            </ul>
            <label htmlFor={style.check} className={style.icon}>
                <div className={style.line}></div>
                <div className={style.line}></div>
                <div className={style.line}></div>
            </label>
        </nav>
    </>
    )
}

const mapStateToProps = function (state) {
    return {
        page: state.page,
        country: state.country,
        input: state.inputText
    }
}

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);