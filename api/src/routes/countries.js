const express = require("express");
const {Country, Activity} = require("../db");
const router = express();
const axios = require("axios");
const { Op } = require("sequelize");

const API_URL = "https://restcountries.com/v3.1/all";

var continentes = function (arr) {
    let continente = []
    for (let i = 0; i < arr.length; i++) {
        let valor = arr[i].continente;
        if (continente.indexOf(valor) === -1) {
            continente.push(valor)
        }
    }
    continente.pop()
    return continente;
}

router.get("/", async(req,res)=>{
    const {nombre} = req.query;
    try {     
       if(nombre){
        console.log(nombre);
            const country = await Country.findAll({
                                where: {
                                    nombre:nombre.toLowerCase()
                                },
                                include:[Activity],
                                });
            if(country.length===0) throw "Not Found"
            res.status(201).json(country);
        }else{
            await axios.get(`${API_URL}`)
            .then(response => {
               // await Country.sync({ force: true })
                response.data.map(async pais => {
                   if(pais.flags && pais.capital)
                        {
                            const id= pais.cca3;
                            // console.log(pais.coatOfArms.svg);
                              await Country.findOrCreate({
                                  where:{id},
                                  defaults:{
                                      id: pais.cca3,
                                      nombre: pais.name.common.toLowerCase(),
                                      bandera: pais.flags.svg,
                                      googlemap: pais.maps.googleMaps,
                                      escudo: pais.coatOfArms ? pais.coatOfArms.svg : null,
                                      continente: pais.continents[0],
                                      capital: pais.capital[0],
                                      subregion: pais.subregion,
                                      area: pais.area,
                                      poblacion: pais.population,
                                      maps: pais.maps.googleMaps,
                                  },                    
                              })
                        }
                })
            });
            const countries = await Country.findAll();
            return res.status(200).json(countries);
        }

    } catch (error) {
        res.send(404).json(error.message);
    }
});

/* GET de los continentes*/
router.get("/continents", async (req, res) => {
    const countries = await Country.findAll({
        attributes: ['continente']
    });
    var respuesta = continentes(countries);
    res.json(respuesta);
});

/* GET por continente */
router.get("/continents/:name", async(req, res)=>{
    const {name} = req.params;
    try {
        const countries = await Country.findAll({
            where: {continente:name}
        });
        return res.status(200).json(countries);
    } catch (error) {
        res.send(404).json(error.message);
    }
})

/* GET ordenado por poblacion*/
router.get("/population/:orden", async(req, res)=>{
    const {orden} = req.params; //1:Descendente
                            // 0: Ascendente
                            console.log(orden);
    try {
        if(orden==='1'){
            const countries = await Country.findAll({
                order:[['poblacion', 'DESC'],
                ]
            });
           return res.status(201).json(countries);
        }
        if(orden==='0'){
            const countries = await Country.findAll({
                order:[['poblacion', 'ASC'],
                ]
            });
            return res.status(201).json(countries);
        }
        const countries = await Country.findAll();
        return res.status(200).json(countries);     
    } catch (error) {
        res.status(401).json(error.message);
    }
});

/* GET por id del Pais*/
router.get("/:idCountry", async(req, res)=>{
    const {idCountry} = req.params;
    console.log(idCountry);
    try {
        //const country = await Country.findByPk(idCountry)
        const country = await Country.findByPk(
            idCountry,{
            include:[Activity],
            });
        if(!country) throw new Error("Country not found");
        res.status(201).json(country);
    } catch (error) {
        res.status(401).json(error.message);
    }
});

module.exports = router;
