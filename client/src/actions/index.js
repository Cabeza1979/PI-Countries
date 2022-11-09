import axios from "axios";
import { FILTER_BY_POPULATION, FILTER_BY_ALPH, FILTER_BY_CONTINENT,
     FILTER_BY_SEARCH, FIND_COUNTRY, GET_POST, GET_ALL_COUNTRIES, GET_MAP,
      NEXT_PAGE, PREV_PAGE, RESET, FILTER_BY_ACTIVITY, LAST } from "./types";


      export function postActivity(data) {
        return function (dispatch) {
            dispatch(getPost());
            axios.get(`/countries/${data.pais}`)
                .then(r => data["idPais"] = r.data[0].id)
                .then(() => axios.post('/activity/', data))
        }
    };
    
    export function getPost() {
        return {
            type: GET_POST,
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
            axios.get(`/countries`)
                .then(data => dispatch(findCountry(data.data)))
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