const { DataTypes, Op } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('activity', {
    id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement:true,
         },
    nombre: {
         type: DataTypes.STRING
         },
    dificultad: {
         type: DataTypes.INTEGER,
         validate:{
          min:1,
          max:5
        },
         },
    duracion: {
         type: DataTypes.INTEGER
         },
    temporada: {
         type: DataTypes.ENUM(['verano', 'otoño', 'primavera', 'invierno']),
         defaultValue: 'invierno'
         },
  },{timestamps: false});
};