const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');
const Session = sequelize.define('Session', {
  id: {
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE', 
  },
  token: {
    type: DataTypes.STRING, 
    allowNull: false,
  },

  expireAt: {
    type: DataTypes.DATE, // Date et heure d'expiration de la session
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE, // Date de création de la session
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'sessions', 
  timestamps: true, 
});

module.exports = Session;
