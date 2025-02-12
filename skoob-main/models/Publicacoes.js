const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Publicacao = sequelize.define('Publicacao', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true,
    }, 
    autor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tema: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }); 

module.exports = Publicacao;