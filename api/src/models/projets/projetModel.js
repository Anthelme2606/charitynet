const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../../config/database'); 
class Projet extends Model {}

Projet.init({
 
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  domaine: {
    type: DataTypes.ENUM(
      'Education',
      'Sante',
      'Social',
      'Culturel',
      'Financier',
      'Environnement',
      'Technologie',
      'Sport',
      'Agriculture',
      'Infrastructure',
      'Autre'
    ), 
    allowNull: false,
  },
  statut: {
    type: DataTypes.ENUM('Pending', 'InProgress', 'Completed'),
    allowNull: false,
    defaultValue: 'Pending'
  },
  dateDebut: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dateFin: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isValid: {
    type: DataTypes.BOOLEAN,
    defaultValue:false,
    allowNull: true,
  },
  beneficiaireId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: "beneficiaries",
      key: 'id',
    },
  }
}, {
  sequelize,
  modelName: 'Projet',
  tableName: 'projets',
  timestamps: true,
});

// // Relation avec les donateurs (qui suivent le projet)
// Projet.associate = (models) => {
//   Projet.belongsToMany(models.Donateur, {
//     through: 'ProjetDonateur', // Table intermédiaire pour le suivi des donateurs
//     as: 'donateursSuivi',
//     foreignKey: 'projetId',
//   });

//   // Relation avec les aides reçues
//   Projet.hasMany(models.Aide, {
//     foreignKey: 'projetId',
//     as: 'aides',
//   });
// };

module.exports = Projet;
