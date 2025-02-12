const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Livros = sequelize.define('Livros', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
},
  título: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dtlanc: {
    type: DataTypes.DATE,
    allowNull: false
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  adap_cinema:{
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  nota:{
    type:DataTypes.INTEGER,
    allowNull: true
  }
});

module.exports = Livros;

