import axios from "axios";
import { FILTER_BY_POPULATION, FILTER_BY_ALPH, FILTER_BY_CONTINENT,
     FILTER_BY_SEARCH, FIND_COUNTRY, GET_POST,
      NEXT_PAGE, PREV_PAGE, RESET, FILTER_BY_ACTIVITY, LAST, ALL_ACTIVITIES, DELETE_ACTIVITY } from "./types";


      export const postActivity=(data) => {
        return function (dispatch) {
            dispatch(getPost());
         return axios.post('/activities',
            {
                nombre: data.nombre,
                dificultad:data.dificultad,
                duracion :data.duracion,
                temporada: data.temporada,
                countries:data.pais
            }).then(data=>{return data} )
            .catch((error)=>alert("Activity already existing in the DB"))           
        }
    };

    //     "id":["BRB","CHL","ARG"]
    export const putCountriesInActivity=(data) => {
        return function (dispatch) {
            dispatch(getPost());
            //console.log("estoy en putCountriesInActivity",data);
            axios.put('/updatecountries/:idActivity',
            {
                countries:data
            }
            )
                .then()
        }
    };
    
    export function getPost() {
        return {
            type: GET_POST,
        }
    }
    export function deletePost() {
        return {
            type: DELETE_ACTIVITY,
        }
    }

    export function findCountry(data) {
        return {
            type: FIND_COUNTRY,
            payload: data
        }
    }
    export function fetchCountry() {
        return function (dispatch) {
            dispatch(getPost());
            axios.get('/countries')
                .then(data => dispatch(findCountry(data.data)))
        }
    };

    export function fetchActivity(name) {

        return function (dispatch) {
            dispatch(getPost());
            axios.get(`activities/${name}`)
                .then(data => dispatch(filterByActivity(data.data)))
        }
    };

    export function allActivities() {
        
        return function (dispatch) {
            dispatch(getPost());
            axios.get("/activities")
                .then(data => dispatch(getAllActivities(data.data)))
        }
    };

    export function deleteActivities(id){
       console.log("deleteActivites ", id);
        return function () {
            axios.delete(`/activities/${id}`)
            .then(() => alert('Delete successful'));
            
        }
    };
    
    export function orderCountry(orden) {
        return {
            type: FILTER_BY_POPULATION,
            payload: orden
        }
    }
    
    export function filterBySearch(data) {
        return {
            type: FILTER_BY_SEARCH,
            payload: data
        }
    }
    
    export function nextPage(page) {
        return {
            type: NEXT_PAGE,
            payload: page
        }
    }
    export function prevPage(page) {
        return {
            type: PREV_PAGE,
            payload: page
        }
    }
    export function reset() {
        return {
            type: RESET
        }
    }
    
    export function filterByContinent(data) {
        return {
            type: FILTER_BY_CONTINENT,
            payload: data
        }
    }
    
    export function filterByActivity(data) {
        return {
            type: FILTER_BY_ACTIVITY,
            payload: data
        }
    }
    export function getAllActivities(data) {
        return {
            type: ALL_ACTIVITIES,
            payload: data
        }
    }

    export function deleteActivity(data) {
        console.log("estoy en actions deleteActivity: ", data );
        return {
            type: DELETE_ACTIVITY,
            payload: data
        }
    }
    

    export function filterByAlph(data) {
        return {
            type: FILTER_BY_ALPH,
            payload: data
        }
    }
    
    export function last() {
        return {
            type: LAST
        }
    }