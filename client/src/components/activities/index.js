import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../../actions";
import Activity from "../cardActivity";
import axios from 'axios';
import { Link } from "react-router-dom";
import Btns from "../buttons";

const Activities = (props)=>{
    
    const [activities, setActivities] = useState([]);

    useEffect(() => {
             axios.get('/activities')
            .then(data => setActivities(data.data))

    }, []);
    
        const  deleteCard=(id)=>{
        console.log("CardActivity", id);
        props.deleteActivities(id);
        setActivities(oldActivities => oldActivities.filter(a => a.id !== id));
    }

    return (
        <>
            <div >
                <br></br>
                <Link to="/home"> <Btns prop="Home" /></Link></div>
            { activities.map( activity => <Activity
                id= {activity.id}
                nombre = {activity.nombre}
                dificultad = {activity.dificultad}
                duracion = {activity.duracion}
                temporada ={activity.temporada}
                key= {activity.nombre}
                onDelete = {()=>deleteCard (activity.id)}
            />)
            }
        
        
        </>

    )   
}

const mapStateToProps = (state) => ({
    activitiesState: state.activities,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Activities)