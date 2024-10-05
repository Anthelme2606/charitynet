const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../../config/database'); 

class Aide extends Model {}

Aide.init({
  
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  preuve: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  projetId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: 'projets', 
      key: 'id',
    },
  },
  donateurId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: 'donateurs', 
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Aide',
  tableName: 'aides',
  timestamps: true,
});

module.exports = Aide;
