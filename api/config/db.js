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
// const tableName = 'users'; 
// const columnName = 'referenceNumber'; 
// const columnOptions = {
//   type: Sequelize.STRING, 
//   allowNull: false, 
//   unique: true 
// };
const tableName = 'donors';
const modifications = [
  { action: 'DROP', column: 'EMAIL', options: '' },
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
