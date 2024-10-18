const mysql = require('mysql2/promise'); 
const sequelize = require('./database'); 
const alterTable =require('./revision');
const { Sequelize } = require('sequelize');
async function createDatabaseIfNotExists(dbName) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  const [rows] = await connection.query(`SHOW DATABASES LIKE '${dbName}'`);

  if (rows.length === 0) {
   // console.log(`La base de données '${dbName}' n'existe pas. Création en cours...`);
    await connection.query(`CREATE DATABASE ${dbName}`);
   // console.log(`La base de données '${dbName}' a été créée avec succès.`);
  }

  await connection.end();
}
// // Exemple d'utilisation
// const tableName = 'projets'; 
// const columnName = 'image'; 
// const columnOptions = {
//   type: Sequelize.STRING, 
//   allowNull: true, 
// 
// };
const tableName = 'projets';
const modifications = [
  { action: 'ADD', column: 'objectif', options: 'DECIMAL(10, 2) NULL' }, // DECIMAL pour les montants financiers
  { action: 'ADD', column: 'resume', options: 'TEXT NULL' }, // TEXT pour le résumé (summary)
];





async function startDatabase() {
  try {
   // await alterTable(sequelize, tableName, modifications);
    const dbName = process.env.DB_NAME;
    await createDatabaseIfNotExists(dbName);
    await sequelize.authenticate();
    //console.log('Connexion à la base de données établie avec succès.');
    await sequelize.sync();
    //console.log('Les modèles ont été synchronisés avec succès.');
  } catch (error) {
   // console.error('Impossible de se connecter à la base de données:', error);
  }
}
module.exports = startDatabase;
