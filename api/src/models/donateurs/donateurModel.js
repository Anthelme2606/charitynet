const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

class Donor extends Model {}

Donor.init({
  donorType: {
    type: DataTypes.ENUM('Individual', 'Organization'), 
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  organizationName: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  // email: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   unique: true,
  //   validate: {
  //     isEmail: true,
  //   },
  // },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  biography: {
    type: DataTypes.JSON, 
    allowNull: true, 
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Donor',
  tableName: 'donors',
  timestamps: true,
});

// Association avec User
Donor.associate = (models) => {
  Donor.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
  });
};

module.exports = Donor;
