const { DataTypes, Op } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('activity', {
    id: {
         type: DataTypes.INTEGER,
         primaryKey: true
         },
    nombre: {
         type: DataTypes.STRING
         },
    dificultad: {
         type: DataTypes.INTEGER,
         [Op.between]: [1, 5]
         },
    duracion: {
         type: DataTypes.INTEGER
         },
    temporada: {
         type: DataTypes.ENUM('Verano', 'Otoño', 'Primavera', 'Invierno')
         },
  },{timestamps: false});
};