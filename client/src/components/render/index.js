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
                <div>
                    <Btns prop="<< " action={reset} />
                    <Btns prop="< " action={prevPage} />
                    
                    <Btns prop=" > " action={pNext} />
                    <Btns prop=" >>" action={last} />
                </div>
            </div>
            <div className={style.lista}>
                {
                    country.length > 0 ?
                        <Countries paises={country.slice(page, page + 10)} />
                        :
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