const express = require("express");
const {Activity, Country} = require("../db");
const router = express();
const { Op } = require("sequelize");

/*GET de todas las actividades */
router.get("/", async(req,res) =>{
   try {
    res.status(201).json(await Activity.findAll());
   } catch (error) {
    res.status(400).json(error.message);
   }
});

/*GET con los paises donde se realiza la actividad */
router.get("/:actividad", async(req, res)=>{
    const {actividad} = req.params;
    try {
        const allActivities = await Activity.findAll({
            where:{nombre : actividad},
            include: Country })
           //console.log(allActivities[0].countries);
        res.status(201).json(allActivities[0].countries);

    } catch (error) {
        res.status(401).json(error.message);
    }
})
/* POST nueva actividad */
router.post("/", async (req, res) => {
    const { nombre, dificultad, duracion, temporada, countries } = req.body
    try {
        if(!nombre || !dificultad || !duracion || !temporada )
        throw new Error("Datos faltantes o erroneos, verifique")
        if(dificultad > 5 || dificultad < 1) throw new Error("El campo dificultad debe estar entre 1 y 5");

        const newActivity = await Activity.create({
            nombre,
            dificultad,
            duracion,
            temporada,
        });
        await newActivity.addCountries(countries);
        res.status(201).json(newActivity)
    } catch (error) {
        res.status(401).json(error.message);
    }
});

/*PUT Modificar actividad */
router.put("/update/:attribute", async(req, res)=>{
    const {attribute} = req.params;
    const {id, value} = req.body;
    console.log(id, value, attribute);
    try {
        const actividad = await Activity.update(
            {[attribute]:value,},
            {
                where:{id:id}
            }
        )       
        res.status(201).json(actividad)
    } catch (error) {
        res.status(401).json(error.message);
    }
});

router.put("/updatecountries/:idActivity", async(req, res)=>{
    const idActivity= req.params;
    const paises= req.body;

    console.log(idActivity.idActivity);
    try {
        const idPaises = paises.id;
        const getActivity = await Activity.findByPk(idActivity.idActivity);
           
           for (i=0; i< idPaises.length; i++){
            await getActivity.addCountries(idPaises[i])
           }
           
        res.status(201).json(idPaises)
    } catch (error) {
}

})

router.delete("/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const activity = await Activity.findByPk(id);
        activity.destroy();
        res.status(200).send(activity);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;