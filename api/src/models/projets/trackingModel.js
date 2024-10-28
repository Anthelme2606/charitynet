const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

class TrackingProject extends Model {}

// Initialisation du modèle
TrackingProject.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Nom de la table des utilisateurs
      key: 'id'
    }
  },
  numberCreate: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  numberUpdate: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  numberDelete: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
//   operationDate: {
//     type: DataTypes.DATEONLY, // Pour stocker la date sans l'heure
//     allowNull: false
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//     field: 'createdAt' // Pour correspondre au champ dans la base de données
//   }
}, {
  sequelize,
  modelName: 'TrackingProject',
    timestamps: true, // Cela ajoutera createdAt et updatedAt
    createdAt: 'createdAt', // Renomme le champ createdAt
    updatedAt: 'updatedAt', // Renomme le champ updatedAt
});

// Exporter le modèle
module.exports = TrackingProject;
