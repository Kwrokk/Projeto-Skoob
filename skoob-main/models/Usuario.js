const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Usuario = sequelize.define('USuario', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true,
    }, 
    pontos: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    tempo_lid: { 
        type: DataTypes.DECIMAL,
        allowNull: false,
    }
  }, {
    tableName: "USuarios",
    timestamps: true
  }); 

module.exports = Usuario;