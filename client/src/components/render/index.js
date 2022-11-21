import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../../actions";
import style from './render.module.css'
import Countries from '../countries'
import Btns from "../buttons";
import imagen from "./../../img/background-9.jpg"


const ApiPages = ({ country, page, nextPage, prevPage, fetchCountry, reset, last }) => {

    var xIni;
    var numPage = 1 + page/10;
    var cantidadPage= Math.ceil(country.length/10);

    useEffect(() => {
        fetchCountry();
    }, [fetchCountry])

    const pNext= ()=> {
        if (page / 10 < country.length / 10 - 1) {
            nextPage()
        }
        return
    }

    const inicioToque=(e)=> {
        xIni = e.targetTouches[0].pageX
    }

    const pChange=(e)=> {
        if (e.targetTouches[0].pageX + 5 > xIni) {
            prevPage();
        }
        if (e.targetTouches[0].pageX - 5 < xIni) {
            pNext();
        }
        
    }
    
    return (
        <div className={style.container} onTouchStart={inicioToque} onTouchMove={pChange}>
            <div className={style.botonesDireccion}>
                
                   <Btns prop="<< " action={reset} />
                    <Btns prop="< " action={prevPage} />
                    <label className={style.label}>{numPage}/{cantidadPage}</label>
                    <Btns prop=" > " action={pNext} />
                    <Btns prop=" >>" action={last} />
                
            </div>
            <div className={style.lista}>
                {
                    
                    (page === 0) ? <Countries paises={country.slice(0, page + 9)} />  :
                     (country.length > 0) ? <Countries paises={country.slice(page, page + 10)} /> : 
                     <img src={imagen} alt="" />
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    page: state.page,
    country: state.country,
    order: state.order
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ApiPages)