const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../../config/database'); 

class Beneficiary extends Model {}

Beneficiary.init({
  identificationNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  
  beneficiaryType: {
    type: DataTypes.ENUM('Individual', 'Organization'),
    allowNull: false,
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: true, 
  },
  biography: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  legalStatus: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: { // Ajout du champ userId
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', 
      key: 'id', 
    },
  },
}, {
  sequelize,
  modelName: 'Beneficiary',
  tableName: 'beneficiaries',
  timestamps: true, 
});

// Définir la relation avec le modèle User
Beneficiary.associate = (models) => {
  Beneficiary.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user', // Alias pour la relation
  });
};

module.exports = Beneficiary;
